import { LightningElement, track, api } from 'lwc';
import getSingleTVSeries from '@salesforce/apex/FilmListViewController.getSingleTVSeries';

export default class TrailerURL extends LightningElement {
    @track trailerURL;
    @api recordId;

    connectedCallback() {
        this.getURL();
    }

    get isTvSeriesAvaiable() {
        return !!this.trailerURL;
    }

    async getURL() {
        getSingleTVSeries({tvSeriesId: this.recordId})
            .then(result => {
                this.trailerURL = result
            })
            .catch(error => {
                console.log(error)
            })
    }
}