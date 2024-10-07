import { LightningElement, api } from 'lwc';

export default class TvSeriesSingleCard extends LightningElement {
    @api series;

    get backgroundImageStyle() {
        return `background-image:url(${this.series.Picture_URL__c})`;
    }
}