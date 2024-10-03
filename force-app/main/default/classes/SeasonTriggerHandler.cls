public with sharing class SeasonTriggerHandler {
    public static void handleSeasonBeforeDelete(Map<Id, Season__c> oldMap) {
        List<Episode__c> listOfEpisodes = [SELECT Id FROM Episode__c WHERE Season__c IN :oldMap.keySet()];
        delete listOfEpisodes;
    }
}