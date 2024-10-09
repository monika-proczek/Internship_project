import { LightningElement, api } from 'lwc';
import createNewRating from '@salesforce/apex/FilmListViewController.createNewRating';
import getCurrentRating from '@salesforce/apex/FilmListViewController.getCurrentRating';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StarReviewComponent extends LightningElement {
    @api name;
    @api seriesId;
    rating;
    currentRating; 

    connectedCallback() {
        this.getCurrentUserRating();
    }

    handleStarClick(event) {
        this.rating = event.target.value;  
    }

    handleSubmit(){
        console.log(rating);
    }

    async getCurrentUserRating() {
        getCurrentRating({seriesId: this.seriesId})
            .then(result => {
                this.currentRating = result
            })
            .catch(error => {
                this.showToast('error', 'Sorry, we could not process your rating, please try again later')
            })
    }


    async submitReview() {
        createNewRating({stars: this.rating, seriesId: this.seriesId})
            .then(result => {
                this.currentRating =this.rating;
                this.showToast('success', 'Your rating for this series was susccessfuly updated')
            })
            .catch(error => {
                this.showToast('error', 'Sorry, we could not process your rating, please try again later')
            })
    }

    showToast(variant, message) {
        const event = new ShowToastEvent({
            title: 'Get Help',
            variant: variant,
            message: message,
        });
        this.dispatchEvent(event);
    }

}