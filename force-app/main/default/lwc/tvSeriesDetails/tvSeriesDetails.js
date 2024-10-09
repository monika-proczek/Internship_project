import { LightningElement, track, api } from 'lwc';
import getSingleTVSeries from '@salesforce/apex/FilmListViewController.getSingleTVSeries';


export default class TvSeriesDetails extends LightningElement {
    @track singleTvSeries;
    @api recordId;

    connectedCallback() {
        this.getOneTVSeries();
    }

    get isTvSeriesAvaiable() {
        return !!this.singleTvSeries;
    }

    get backgroundImageStyle() {
        return `background-image:url(${this.singleTvSeries.Picture_URL__c})`;
    }

    async getOneTVSeries() {
        getSingleTVSeries({tvSeriesId: this.recordId})
            .then(result => {
                this.singleTvSeries = result
            })
            .catch(error => {
                console.log(error)
            })
    }

}