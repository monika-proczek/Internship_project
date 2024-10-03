public with sharing class TVSeriesTriggerHandler {
    public static void handleTVSeriesBeforeDelete(Map<Id, TV_Series__c> oldMap) {
        List<Season__c> listOfSeasons = [SELECT Id FROM Season__c WHERE TV_Series__c IN :oldMap.keySet()];
        delete listOfSeasons;
    }
}