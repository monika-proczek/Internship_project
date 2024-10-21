trigger TVSeriesTrigger on TV_Series__c (before delete, before insert, before update) {
    if (Trigger.isBefore && Trigger.isDelete) {
        TVSeriesTriggerHandler.handleTVSeriesBeforeDelete(Trigger.oldMap);
    }

    if (Trigger.isBefore && Trigger.isUpdate) {
        TVSeriesTriggerHandler.checkIfNameIsUniqueOnUpdate(Trigger.newMap, Trigger.oldMap);
    }

    if (Trigger.isBefore && Trigger.isInsert) {
        TVSeriesTriggerHandler.checkIfNameIsUniqueOnInsert(Trigger.new);
    }
}