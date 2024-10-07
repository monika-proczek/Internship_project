import { LightningElement, track } from 'lwc';
import getMovies from '@salesforce/apex/FilmListViewController.getMovies';

export default class MoviesList extends LightningElement {
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
}