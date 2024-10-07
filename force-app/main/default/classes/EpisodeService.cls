public with sharing class EpisodeService {
    public static List<Episode__c> getEpisodesPerSeason(Id seasonId) {
        return [SELECT Id, Name, Category__c, Description__c, Season__c, TV_Series__c, Episode_number__c FROM Episode__c WHERE RecordType.DeveloperName  = 'Series_Episode' AND Season__c = :seasonId ORDER BY Episode_number__c];
    }

    public static Episode__c getSingleEpisode(Id episodeId) {
        return [SELECT Id, Name, Category__c, Description__c, Season__c, TV_Series__c, Episode_number__c FROM Episode__c WHERE RecordType.DeveloperName  = 'Series_Episode' AND Id = :episodeId];
    }

    public static List<Episode__c> getMovies() {
        return [SELECT Id, Name, Category__c, Description__c FROM Episode__c WHERE RecordType.DeveloperName = 'Movie' ORDER BY Name];
    }

    public static Episode__c getMovie() {
        return [SELECT Id, Name, Category__c, Description__c FROM Episode__c WHERE RecordType.DeveloperName = 'Movie'];
    }
}
