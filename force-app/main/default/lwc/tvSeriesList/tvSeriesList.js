import { LightningElement,track } from 'lwc';
import getTVSeries from '@salesforce/apex/FilmListViewController.getTVSeries';
import { NavigationMixin } from 'lightning/navigation';

export default class TvSeriesList extends NavigationMixin(LightningElement) {
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

    handleTileClicked(event) {
        this.navigateToDetailPage(event.currentTarget.dataset.id)
    }

    navigateToDetailPage(seriesId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: seriesId,
                objectApiName: 'TV_Series__c',
                actionName: 'view'
            },
        });
    }

}