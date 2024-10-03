trigger TVSeriesTrigger on TV_Series__c (before delete) {
    if (Trigger.isBefore) {
        TVSeriesTriggerHandler.handleTVSeriesBeforeDelete(Trigger.oldMap);
    }
}