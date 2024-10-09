import { LightningElement, track, wire } from 'lwc';
import getSingleEpisode from '@salesforce/apex/FilmListViewController.getSingleEpisode';
import { subscribe, MessageContext } from 'lightning/messageService';
import EPISODE_SELECTED_CHANNEL from '@salesforce/messageChannel/Episode_Selected__c';
import SEASON_SELECTED_CHANNEL from '@salesforce/messageChannel/Season_Selected__c';

export default class EpisodeDetails extends LightningElement {
    @track singleEpisode;
    episodeId;
    seasonId;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
        this.subscribeToSeasonMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            EPISODE_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    subscribeToSeasonMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            SEASON_SELECTED_CHANNEL,
            (message) => this.handleSeasonMessage(message)
        );
    }

    handleMessage(message) {
        this.episodeId = message.episodeRecordId;
        this.getOneEpisodeDetails();
    }

    handleSeasonMessage() {
        this.episodeId = null;
        this.singleEpisode = null;
    }

    get isEpisodeAvailable() {
        return this.singleEpisode != null && this.singleEpisode != undefined;
    }

    async getOneEpisodeDetails() {
        getSingleEpisode({episodeId: this.episodeId})
            .then(result => {
                this.singleEpisode = result
            })
            .catch(error => {
                console.log(error)
            })
    }
}