public with sharing class SeasonTriggerHandler {
    public static void handleSeasonBeforeDelete(Map<Id, Season__c> oldMap) {
        List<Episode__c> listOfEpisodes = [SELECT Id FROM Episode__c WHERE Season__c IN :oldMap.keySet()];
        delete listOfEpisodes;
    }

    public static void checkIfNumberIsUniqueOnInsert(List<Season__c> newList) {
        List<Decimal> listOfSesonsNumbers = new List<Decimal>();
        List<Id> listOfSeriesIds = new List<Id>();

        for (Season__c season : newList) {
            listOfSesonsNumbers.add(season.Season_number__c);
            listOfSeriesIds.add(season.TV_Series__c);
        }

        List<Season__c> existingSeasonWithSameNumberAndSeasons = [SELECT Id,Season_number__c, TV_Series__c FROM Season__c WHERE Season_number__c IN :listOfSesonsNumbers AND TV_Series__c IN :listOfSeriesIds];
        if(existingSeasonWithSameNumberAndSeasons.size() >0) {
            for(Season__c season :newList) {
                season.addError('Such Season number already exists for this Series');
            }
        }
    }

    public static void checkIfNumberIsUniqueOnUpdate(List<Season__c> newList, Map<Id, Season__c> newMap) {
        List<Decimal> listOfSesonsNumbers = new List<Decimal>();
        List<Id> listOfSeriesIds = new List<Id>();

        for (Season__c season : newList) {
            listOfSesonsNumbers.add(season.Season_number__c);
            listOfSeriesIds.add(season.TV_Series__c);
        }

        List<Season__c> existingSeasonWithSameNumberAndSeasons = [SELECT Id,Season_number__c, TV_Series__c FROM Season__c WHERE Season_number__c IN :listOfSesonsNumbers AND TV_Series__c IN :listOfSeriesIds AND Id NOT IN :newMap.keySet()];
        if(existingSeasonWithSameNumberAndSeasons.size() >0) {
            for(Season__c season :newList) {
                season.addError('Such Season number already exists for this Series');
            }
        }
    }

    public static void updateSeasonName(Map<Id, Season__c> newMap) {
        List<Season__c> listOfSeasons = [SELECT Id, Name, TV_Series__r.Name, Season_number__c FROM Season__c WHERE Id  IN :newMap.keySet()];
        for(Season__c season: listOfSeasons) {
            season.Name = season.TV_Series__r.Name + ' - ' + season.Name + ' (Season number: ' + season.Season_number__c + ')';
        }
        update listOfSeasons;
    }

}