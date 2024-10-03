trigger SeasonTrigger on Season__c (before delete) {
    if (Trigger.isBefore) {
        SeasonTriggerHandler.handleSeasonBeforeDelete(Trigger.oldMap);
    }
}