public with sharing class TVSeriesService {
    public static List<TV_Series__c> getTVSeries() {
        return [SELECT Id, Name, Category__c, Description__c FROM TV_Series__c ORDER BY Name];
    }

    public static TV_Series__c getSingleTVSeries(Id tvSeriesId) {
        return [SELECT Id, Name, Category__c, Description__c FROM TV_Series__c WHERE Id = :tvSeriesId][0];
    }
    
}