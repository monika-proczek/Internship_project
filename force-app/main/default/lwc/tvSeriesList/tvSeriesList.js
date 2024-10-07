import { LightningElement,track } from 'lwc';
import getTVSeries from '@salesforce/apex/FilmListViewController.getTVSeries';

export default class TvSeriesList extends LightningElement {
    @track tvSeriesList = [];

    connectedCallback() {
        this.getTVSeriesList();
    }
    
    async getTVSeriesList() {
        getTVSeries()
            .then(result => {
                this.tvSeriesList = result
            })
            .catch(error => {
                console.log(error)
            })
    }
}