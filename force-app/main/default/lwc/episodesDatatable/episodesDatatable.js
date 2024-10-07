import { LightningElement, track, wire } from 'lwc';
import getEpisodesPerSeason from '@salesforce/apex/FilmListViewController.getEpisodesPerSeason';
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import SEASON_SELECTED_CHANNEL from '@salesforce/messageChannel/Season_Selected__c';
import EPISODE_SELECTED_CHANNEL from '@salesforce/messageChannel/Episode_Selected__c';

const columns = [
    { label: 'Episode Number', fieldName: 'Episode_number__c' },
    { label: 'Title', fieldName: 'Name' },
];

export default class EpisodesDatatable extends LightningElement {
    @track episodesList = [];
    columns = columns;
    seasonId;
    selectedEpisodeId;

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
        this.getEpisodes();
    }

    get isEpisodesAvailable() {
        return !!this.episodesList;
    }

    async getEpisodes() {
        getEpisodesPerSeason({seasonId: this.seasonId})
            .then(result => {
                this.episodesList = result
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
}