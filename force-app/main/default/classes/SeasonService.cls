public with sharing class SeasonService {

    public static List<Season__c> getSeasonsPerTVSeries(Id tvSeriesId) {
        return [SELECT Id, Name, TV_Series__c FROM Season__c WHERE TV_Series__c = :tvSeriesId ORDER BY Name];
    }
}