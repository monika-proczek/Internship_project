public with sharing class RatingService {

public static void createNewRating(String stars, Id seriesId) {

    List<Rating__c> existingRating = [SELECT Id FROM Rating__c WHERE TV_Series__c=:seriesId AND CreatedById = :UserInfo.getUserId()];

    if (existingRating.size() >0) {
        existingRating[0].Score__c = stars;
        update existingRating;
    } else {
        Rating__c rating = new Rating__c(Score__c=stars, TV_Series__c=seriesId);
        insert rating;
    } 
}

    public static String checkExistingScore(Id seriesId) {
        List<Rating__c> existingRating = [SELECT Id, Score__c FROM Rating__c WHERE TV_Series__c=:seriesId AND CreatedById = :UserInfo.getUserId() LIMIT 1];
        if(existingRating.size() > 0) {
            return existingRating[0].Score__c;
        }
        return null;
    }
}