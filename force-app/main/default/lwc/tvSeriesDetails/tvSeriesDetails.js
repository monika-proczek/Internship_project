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

