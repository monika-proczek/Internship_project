import { LightningElement, track } from 'lwc';
import getMovies from '@salesforce/apex/FilmListViewController.getMovies';
import { NavigationMixin } from 'lightning/navigation';

export default class MoviesList extends NavigationMixin(LightningElement) {
    @track moviesList = [];

    connectedCallback() {
        this.getMoviesList();
    }

    async getMoviesList() {
        getMovies()
            .then(result => {
                this.moviesList = result
             })
            .catch(error => {
                console.log(error)
            })
        }

    handleTileClicked(event) {
        this.navigateToDetailPage(event.currentTarget.dataset.id)
    }
    
    navigateToDetailPage(movieId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: movieId,
                objectApiName: 'Episode__c',
                actionName: 'view'
                },
            });
        }
}