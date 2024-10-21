public with sharing class TVSeriesTriggerHandler {
    public static void handleTVSeriesBeforeDelete(Map<Id, TV_Series__c> oldMap) {
        List<Season__c> listOfSeasons = [SELECT Id FROM Season__c WHERE TV_Series__c IN :oldMap.keySet()];
        delete listOfSeasons;
    }

    public static void checkIfNameIsUniqueOnUpdate(Map<Id, TV_Series__c> newMap, Map<Id, TV_Series__c> oldMap) {
        List<String> listOfNewNames = new List<String>();
        for (Id key : newMap.keySet()) {
            if( oldMap.get(key).Name != newMap.get(key).Name) {
                listOfNewNames.add(newMap.get(key).Name);
            }           
        }

        if(listOfNewNames.size() > 0) {
            List<TV_Series__c> listOfSeriesWithSameName = [SELECT Id, Name FROM TV_Series__c WHERE Name IN :listOfNewNames];
            List<String> listOfExistingNames = new List<String>();
            if(listOfSeriesWithSameName.size() > 0) {
                for(TV_Series__c series :listOfSeriesWithSameName) {
                    listOfExistingNames.add(series.Name);
                }

                for (Id key : newMap.keySet()) {
                    if(listOfExistingNames.contains(newMap.get(key).Name)) {
                        newMap.get(key).addError('Such Name already exists, please provide unique name');
                    }
                }
            }
        }
    }

    public static void checkIfNameIsUniqueOnInsert(List<TV_Series__c> newList) {
        List<String> listOfNewNames = new List<String>();
        for (TV_Series__c series : newList) {
                listOfNewNames.add(series.Name);         
        }

        if(listOfNewNames.size() > 0) {
            List<TV_Series__c> listOfSeriesWithSameName = [SELECT Id, Name FROM TV_Series__c WHERE Name IN :listOfNewNames];
            List<String> listOfExistingNames = new List<String>();
            if(listOfSeriesWithSameName.size() > 0) {
                for(TV_Series__c series :listOfSeriesWithSameName) {
                    listOfExistingNames.add(series.Name);
                }

                for (TV_Series__c series : newList) {
                    if(listOfExistingNames.contains(series.Name)) {
                        series.addError('Such Name already exists, please provide unique name');
                    }
                }
            }
        }
    }
}