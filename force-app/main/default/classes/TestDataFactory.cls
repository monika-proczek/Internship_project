@isTest
public class TestDataFactory {
    public static TV_Series__c createSingleTVSeries(String seriesName, String seriesCategory) {
        List<TV_Series__c> listOfTVSeries = new List<TV_Series__c>();
        TV_Series__c newTVSeries = new TV_Series__c(Series_Name__c = seriesName,
        Picture_URL__c = 'https://wallpapers.com/images/high/ftestickers-black-circle-lines-scribbles-abstract-crazy-line-hd-png-download-ckk3wyb5ujs1hj5e.png',
        Category__c = seriesCategory);
        insert newTVSeries;
        return newTVSeries;
    }

    public static List<Season__c> createSeasons(Integer numOfSeasons, String seasonName, Id tvSeriesId) {
        List<Season__c> listOfSeasons = new List<Season__c>();
        for(Integer i=0;i<numOfSeasons;i++) {
            Season__c newSeason = new Season__c(Name = seasonName + i,
            TV_Series__c = tvSeriesId);
            listOfSeasons.add(newSeason);
        }
        insert listOfSeasons;
        return listOfSeasons;
        }

    public static List<Episode__c> createEpisodes(Integer numOfEpisodes, String episodeName, Id seasonId, Id tvSeriesId, String episodeDescription) {
        List<Episode__c> listOfEpisodes = new List<Episode__c>();
        for(Integer i=0;i<numOfEpisodes;i++) {
            Episode__c newEpisode = new Episode__c(Name = episodeName + i,
            Season__c = seasonId,
            TV_Series__c = tvSeriesId,
            Description__c = episodeDescription);
            listOfEpisodes.add(newEpisode);
        }
        insert listOfEpisodes;
        return listOfEpisodes;
        }
}