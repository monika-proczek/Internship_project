import { LightningElement, track, api } from 'lwc';
import getMovies from '@salesforce/apex/FilmListViewController.getMovies';
import { NavigationMixin } from 'lightning/navigation';
import fetchMovies from "@salesforce/apex/PaginationController.fetchMovies";
import moviesRecordCount from "@salesforce/apex/PaginationController.moviesRecordCount";

export default class MoviesList extends NavigationMixin(LightningElement) {
    @track moviesList = [];
    @api lastId;
    @api firstId;
    @api buttonTypePrevious;
    @api buttonTypeNext;
    totalRecordCount = 0;
    totalPage = 0;
    pageNumber = 1;
    recordsPerPage =6;

    get disablePrevious() {
        return this.pageNumber == 1;
    }
    // Disable the "Next" button when on the last page
    get disableNext() {
        return this.pageNumber == this.totalPage;
    }

    connectedCallback() {
        this.getSeriesAmount();
        this.getRecords();
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

        async getSeriesAmount() {
            moviesRecordCount()
                .then(result => {
                    this.totalRecordCount = result;
                    this.totalPage = Math.ceil(this.totalRecordCount / this.recordsPerPage);
                    // Ensure pageNumber is within valid range
                    if (this.pageNumber <= 1) {
                        this.pageNumber = 1;
                    } else if (this.pageNumber >= this.totalPage) {
                        this.pageNumber = this.totalPage;
                    }
    
                })
                .catch(error => {
                    console.log(error)
                })
            }
    
        // Fetch records based on pagination parameters
        getRecords() {
            this.showLoading = true;
            fetchMovies({
                buttonTypePrevious: this.buttonTypePrevious,
                buttonTypeNext: this.buttonTypeNext,
                firstId: this.firstId,
                lastId: this.lastId,
                recordsLimit: this.recordsPerPage,
                seasonId: this.seasonId
            })
            .then(result => {
                // Update episodes and pagination
                this.moviesList = result;
    
                // Sort episodes if navigating to the previous page
                if (this.buttonTypePrevious === true) {
                    this.moviesList.sort((a, b) => (a.Id > b.Id) ? 1 : -1);
                }
                this.firstId = this.moviesList[0].Id;
                this.lastId = this.moviesList[result.length - 1].Id;
                this.showLoading = false;
            })
            .catch(error => {
                this.showLoading = false;
                console.error('Error: ' + error.body.message);
            });
        }
        // Handle click on "Previous" button
        handlePrevious() {
            if (this.pageNumber > 1) {
                this.pageNumber = this.pageNumber - 1;
                this.buttonTypePrevious = true;
                this.buttonTypeNext = false;
                this.getRecords();
            }
        }
        // Handle click on "Next" button
        handleNext() {
            if ((this.pageNumber < this.totalPage) && this.pageNumber !== this.totalPage) {
                this.pageNumber = this.pageNumber + 1;
                this.buttonTypeNext = true;
                this.buttonTypePrevious = false;
                this.getRecords();
            }
        }
}