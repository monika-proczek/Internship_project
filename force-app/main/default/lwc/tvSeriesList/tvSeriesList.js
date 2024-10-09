import { LightningElement,track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fetchSeries from "@salesforce/apex/PaginationController.fetchSeries";
import seriesRecordCount from "@salesforce/apex/PaginationController.seriesRecordCount";

export default class TvSeriesList extends NavigationMixin(LightningElement) {
    @track tvSeriesList = [];
    @api lastId;
    @api firstId;
    @api buttonTypePrevious;
    @api buttonTypeNext;
    totalRecordCount = 0;
    totalPage = 0;
    pageNumber = 1;
    recordsPerPage =6;


    get disablePrevious() {
        return this.pageNumber == 1;
    }
    // Disable the "Next" button when on the last page
    get disableNext() {
        return this.pageNumber == this.totalPage;
    }

    connectedCallback() {
        this.getSeriesAmount();
        this.getRecords();
    }

    handleTileClicked(event) {
        this.navigateToDetailPage(event.currentTarget.dataset.id)
    }

    navigateToDetailPage(seriesId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: seriesId,
                objectApiName: 'TV_Series__c',
                actionName: 'view'
            },
        });
    }

    async getSeriesAmount() {
        seriesRecordCount()
            .then(result => {
                this.totalRecordCount = result;
                this.totalPage = Math.ceil(this.totalRecordCount / this.recordsPerPage);
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

    // Fetch records based on pagination parameters
    getRecords() {
        this.showLoading = true;
        fetchSeries({
            buttonTypePrevious: this.buttonTypePrevious,
            buttonTypeNext: this.buttonTypeNext,
            firstId: this.firstId,
            lastId: this.lastId,
            recordsLimit: this.recordsPerPage,
            seasonId: this.seasonId
        })
        .then(result => {
            // Update episodes and pagination
            this.tvSeriesList = result;

            // Sort episodes if navigating to the previous page
            if (this.buttonTypePrevious === true) {
                this.tvSeriesList.sort((a, b) => (a.Id > b.Id) ? 1 : -1);
            }
            this.firstId = this.tvSeriesList[0].Id;
            this.lastId = this.tvSeriesList[result.length - 1].Id;
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