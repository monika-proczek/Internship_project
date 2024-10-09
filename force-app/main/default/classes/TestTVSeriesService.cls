@isTest
private class TestTVSeriesService {

@TestSetup
static void makeData(){
    TV_Series__c newseries = TestDataFactory.createSingleTVSeries('Test Series', 'Comedy');
}

    @isTest
    private static void testGetTVSeries() {
        List<TV_Series__c> series = TVSeriesService.getTVSeries();
        Assert.areEqual(1,series.size());
    }

    @isTest
    private static void testGetSingleTVSeries() {
        TV_Series__c  series = TestDataFactory.createSingleTVSeries('Test Series 2', 'Comedy');
        TVSeriesService.getSingleTVSeries(series.Id);
        Assert.areEqual('Test Series 2',series.Series_Name__c );
    }
    
}