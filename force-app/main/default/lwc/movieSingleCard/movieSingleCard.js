import { LightningElement, api } from 'lwc';

export default class MovieSingleCard extends LightningElement {
    @api movie;

    get backgroundImageStyle() {
        return `background-image:url(${this.movie.Picture_URL__c})`;
    }

}