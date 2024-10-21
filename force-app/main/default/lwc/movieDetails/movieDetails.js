import { LightningElement, track, api } from 'lwc';
import getMovie from '@salesforce/apex/FilmListViewController.getMovie';

export default class MovieDetails extends LightningElement {
    @track singleMovie;
    @api recordId;

    connectedCallback() {
        this.getOneMovie();
    }

    get isMovieAvailable() {
        return !!this.singleMovie;
    }
    
    get backgroundImageStyle() {
        return `background-image:url(${this.singleMovie.Picture_URL__c})`;
    }

    async getOneMovie() {
        getMovie({movieId: this.recordId})
        .then(result => {
            this.singleMovie = result
        })
        .catch(error => {
            console.log(error)
        })
    }
}