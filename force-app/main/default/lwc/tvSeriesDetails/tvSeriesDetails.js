import { LightningElement, track } from 'lwc';
import getSingleTVSeries from '@salesforce/apex/FilmListViewController.getSingleTVSeries';

export default class TvSeriesDetails extends LightningElement {
    @track singleTvSeries;

    connectedCallback() {
        this.getOneTVSeries();
    }

    get isTvSeriesAvaiable() {
        return !!this.singleTvSeries;
    }
    //TO DO: tvSeriesId replace with actually Id 
    async getOneTVSeries() {
        getSingleTVSeries({tvSeriesId: 'a03d2000001t3RJAAY'})
            .then(result => {
                this.singleTvSeries = result
            })
            .catch(error => {
                console.log(error)
            })
    }
}

