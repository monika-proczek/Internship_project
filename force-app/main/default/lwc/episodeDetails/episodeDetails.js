import { LightningElement, track, wire } from 'lwc';
import getSingleEpisode from '@salesforce/apex/FilmListViewController.getSingleEpisode';
import { subscribe, MessageContext } from 'lightning/messageService';
import EPISODE_SELECTED_CHANNEL from '@salesforce/messageChannel/Episode_Selected__c';

export default class EpisodeDetails extends LightningElement {
    @track singleEpisode;
    episodeId;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            EPISODE_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
        this.episodeId = message.episodeRecordId;
        console.log(this.episodeId);
        this.getOneEpisodeDetails();
    }

    get isEpisodeAvailable() {
        return !!this.singleEpisode;
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