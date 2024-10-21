public with sharing class TVSeriesService {
    public static List<TV_Series__c> getTVSeries() {
        return [SELECT Id, Name, Category__c, Description__c, Trailer_URL__c, Picture_URL__c, Average_Rating__c FROM TV_Series__c ORDER BY Name];
    }

    public static TV_Series__c getSingleTVSeries(Id tvSeriesId) {
        return [SELECT Id, Name, Category__c, Description__c, Trailer_URL__c,  Picture_URL__c, Average_Rating__c  FROM TV_Series__c WHERE Id = :tvSeriesId][0];
    }

    public static List<TV_Series__c> getTopRatedSeries() {
        return [SELECT Id, Name, Category__c, Description__c, Picture_URL__c,Average_Rating__c  FROM TV_Series__c WHERE Average_Rating__c != null ORDER BY Average_Rating__c DESC LIMIT 3];
    }
    
}