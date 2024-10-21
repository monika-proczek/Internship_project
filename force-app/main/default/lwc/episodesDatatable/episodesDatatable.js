import { LightningElement, track, wire, api } from 'lwc';
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import SEASON_SELECTED_CHANNEL from '@salesforce/messageChannel/Season_Selected__c';
import EPISODE_SELECTED_CHANNEL from '@salesforce/messageChannel/Episode_Selected__c';
import fetchEpisodes from "@salesforce/apex/PaginationController.fetchEpisodes";
import recordCount from "@salesforce/apex/PaginationController.recordCount";

const columns = [
    { label: 'Episode Number', fieldName: 'Episode_number__c' },
    { label: 'Title', fieldName: 'Name' },
];

export default class EpisodesDatatable extends LightningElement {

    @api recordsPerPage = 10;
    columns = columns;
    @track showLoading = false;
    @api lastEpisodeNumber;
    @api firstEpisodeNumber;
    @api buttonTypePrevious;
    @api buttonTypeNext;
    totalRecountCount = 0;
    totalPage = 0;
    pageNumber = 1;

    @track episodesList = [];
    columns = columns;
    seasonId;
    selectedEpisodeId;
    @track selectedRows;
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            SEASON_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.seasonId = message.seasonRecordId;
        this.buttonTypePrevious = null;
        this.buttonTypeNext = null;
        this.firstEpisodeNumber = null;
        this.lastEpisodeNumber = null;
        this.pageNumber = 1;
        this.selectedEpisodeId = null;
        // this.selectedRows = [];
        this.episodesList = [];
        //setTimeout(()=> {
            this.getEpisodesAmount();
            this.getRecords();
       // },0)
     
    }

    get isEpisodesAvailable() {
        return !!this.episodesList && this.episodesList.length > 0;
    }

    async getEpisodesAmount() {
        recordCount({seasonId: this.seasonId})
            .then(result => {
                this.totalRecountCount = result;
                this.totalPage = Math.ceil(this.totalRecountCount / this.recordsPerPage);
                // Ensure pageNumber is within valid range
                if (this.pageNumber <= 1) {
                    this.pageNumber = 1;
                } else if (this.pageNumber >= this.totalPage) {
                    this.pageNumber = this.totalPage;
                }

            })
            .catch(error => {
                console.log(error)
            })
        }

    handleRowSelection(event){
        const selectedRows = event.detail.selectedRows;
        this.selectedEpisodeId = selectedRows[0].Id;
        this.publishEpisodeChanged();
    }

    publishEpisodeChanged() {
        const payload = { episodeRecordId: this.selectedEpisodeId };
        publish(this.messageContext, EPISODE_SELECTED_CHANNEL, payload);
    }

      // Disable the "Previous" button when on the first page
      get disablePrevious() {
          return this.pageNumber == 1;
      }
      // Disable the "Next" button when on the last page
      get disableNext() {
          return this.pageNumber == this.totalPage;
      }
      // Fetch records based on pagination parameters
      getRecords() {
          this.showLoading = true;
          fetchEpisodes({
              buttonTypePrevious: this.buttonTypePrevious,
              buttonTypeNext: this.buttonTypeNext,
              firstEpisodeNumber: this.firstEpisodeNumber,
              lastEpisodeNumber: this.lastEpisodeNumber,
              recordsLimit: this.recordsPerPage,
              seasonId: this.seasonId
          })
          .then(result => {
              // Update episodes and pagination
              this.episodesList = result;

              // Sort episodes if navigating to the previous page
              if (this.buttonTypePrevious === true) {
                  this.episodesList.sort((a, b) => (a.Episode_number__c > b.Episode_number__c) ? 1 : -1);
              }
              this.firstEpisodeNumber = this.episodesList[0].Episode_number__c;
              this.lastEpisodeNumber = this.episodesList[result.length - 1].Episode_number__c;
              this.showLoading = false;
          })
          .catch(error => {
              this.showLoading = false;
              console.error('Error: ' + error.body.message);
          });
      }
      // Handle click on "Previous" button
      handlePrevious() {
          if (this.pageNumber > 1) {
              this.pageNumber = this.pageNumber - 1;
              this.buttonTypePrevious = true;
              this.buttonTypeNext = false;
              this.getRecords();
          }
      }
      // Handle click on "Next" button
      handleNext() {
          if ((this.pageNumber < this.totalPage) && this.pageNumber !== this.totalPage) {
              this.pageNumber = this.pageNumber + 1;
              this.buttonTypeNext = true;
              this.buttonTypePrevious = false;
              this.getRecords();
          }
      }

  }