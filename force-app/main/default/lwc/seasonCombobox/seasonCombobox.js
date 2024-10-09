import { LightningElement, track, api, wire } from 'lwc';
import getSeasonsPerTVSeries from '@salesforce/apex/FilmListViewController.getSeasonsPerTVSeries';
import { publish, MessageContext } from 'lightning/messageService';
import SEASON_SELECTED_CHANNEL from '@salesforce/messageChannel/Season_Selected__c';

export default class SeasonCombobox extends LightningElement {
    @track seasonsPicklistOptions = [];
    @api series;
    selectedSeasonId;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.getSeasons();
    }

    handleChangeSeason(event){
        this.selectedSeasonId = event.detail.value;
        this.publishSeasonChanged()

    }

    get seasonsPicklistOptionsAvaiable() {
        return this.seasonsPicklistOptions.length && this.seasonsPicklistOptions.length > 0;
    }

    async getSeasons() {
        getSeasonsPerTVSeries({tvSeriesId: this.series})
            .then(result => {
                this.seasonsPicklistOptions = result.map(resultElement => {
                    return { label: resultElement.Name, value: resultElement.Id }
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    
        publishSeasonChanged() {
            const payload = { seasonRecordId: this.selectedSeasonId };
            publish(this.messageContext, SEASON_SELECTED_CHANNEL, payload);
        }

}