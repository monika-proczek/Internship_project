trigger SeasonTrigger on Season__c (before delete, before insert, before update, after insert, after update) {
    if (Trigger.isBefore && Trigger.isDelete) {
        SeasonTriggerHandler.handleSeasonBeforeDelete(Trigger.oldMap);
    }

    if ( Trigger.isBefore && Trigger.isUpdate) {
        SeasonTriggerHandler.checkIfNumberIsUniqueOnUpdate(Trigger.new, Trigger.newMap);
        
    }

    if ( Trigger.isBefore && Trigger.isInsert) {
        SeasonTriggerHandler.checkIfNumberIsUniqueOnInsert(Trigger.new);
        
    }

    if (Trigger.isAfter && Trigger.isInsert) {
        SeasonTriggerHandler.updateSeasonName(Trigger.newMap);
    }


}