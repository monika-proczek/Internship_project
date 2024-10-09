import { LightningElement, track } from 'lwc';
import getTopSeries from '@salesforce/apex/FilmListViewController.getTopSeries';

export default class TopSeriesComponent extends LightningElement {
    @track seriesData;

    connectedCallback() {
        this.getTopSeries();
    }

    get firstSeries() {
        return this.seriesData[0];
    }
    get secondSeries() {
        return this.seriesData[1];
    }
    get thirdSeries() {
        return this.seriesData[2];
    }

    get firstDescription() {
        return `Average rating is: ${this.seriesData[0].Average_Rating__c}`;
    }

    get secondDescription() {
        return `Average rating is: ${this.seriesData[1].Average_Rating__c}`;
    }
      
    get thridDescription() {
        return `Average rating is: ${this.seriesData[2].Average_Rating__c}`;
    }

    get firstURL() {
        return `/s/tv-series/${this.seriesData[0].Id}`;
    }
    get secondURL() {
        return `/s/tv-series/${this.seriesData[1].Id}`;
    }
    get thirdURL() {
        return `/s/tv-series/${this.seriesData[2].Id}`;
    }

    async getTopSeries() {
        getTopSeries()
            .then(result => {
                this.seriesData = result
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClick() {
        console.log('click');
    }
}