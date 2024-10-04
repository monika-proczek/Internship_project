@isTest
private class TestTVSeriesTrigger {
    public static final String NEW_TV_SERIES_NAME = 'New Great TV Series';
    public static final String NEW_TV_SERIES_CATEGORY = 'Action';
    public static final String NEW_SEASON_NAME = 'New Great Season';


    @TestSetup
    private static void makeData() {
        TV_Series__c newTvSeries = TestDataFactory.createSingleTVSeries(NEW_TV_SERIES_NAME, NEW_TV_SERIES_CATEGORY);
        Season__c newTvSeason = TestDataFactory.createSeasons(1, NEW_SEASON_NAME, newTVSeries.Id)[0];
    }

    @isTest
    private static void testIfSeasonIsDeleted(){
        List<TV_Series__c> tvSeriesInDatabase = [SELECT Id FROM TV_Series__c];
        Test.startTest();
        delete tvSeriesInDatabase;
        Test.stopTest();
        List<Season__c> recentlyDeletedSeason = [SELECT Id FROM Season__c WHERE TV_Series__c = :NEW_TV_SERIES_NAME];
        System.assertEquals(0, recentlyDeletedSeason.size());
    }
}