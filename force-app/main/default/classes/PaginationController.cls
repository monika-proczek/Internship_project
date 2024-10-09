public with sharing class PaginationController {
    @AuraEnabled
    public static List<Episode__c> fetchEpisodes(Boolean buttonTypePrevious, Boolean buttonTypeNext, Integer firstEpisodeNumber, Integer lastEpisodeNumber, Integer recordsLimit, Id seasonId) {
        List<Episode__c> episodesList = new List<Episode__c>();
        if (buttonTypeNext == true) {
            // Fetch records with number greater than the lastEpisodeNumber
            episodesList = [SELECT Id, Name, Episode_number__c, Season__c FROM Episode__c WHERE Episode_number__c > :lastEpisodeNumber AND Season__c = :seasonId ORDER BY Episode_number__c ASC LIMIT :recordsLimit];
        } else if (buttonTypePrevious == true) {
            // Fetch records with number less than the firstEpisodeNumber
            episodesList = [SELECT Id, Name, Episode_number__c, Season__c FROM Episode__c WHERE Episode_number__c < :firstEpisodeNumber AND Season__c = :seasonId ORDER BY Episode_number__c DESC LIMIT :recordsLimit];
        } else {
            // Fetch the first page of records
            episodesList = [SELECT Id, Name, Episode_number__c, Season__c FROM Episode__c WHERE Season__c = :seasonId ORDER BY Episode_number__c ASC LIMIT :recordsLimit];
        }
        if (!episodesList.isEmpty()) {
            return episodesList;
        }
        return null;
    }


    @AuraEnabled(cacheable = true)
    public static Integer recordCount(Id seasonId) {
        Integer countResult = [SELECT COUNT() FROM Episode__c WHERE Season__c = :seasonId];
        System.debug('countResult => ' + countResult);
        return countResult;
    }

    @AuraEnabled
    public static List<TV_Series__c> fetchSeries(Boolean buttonTypePrevious, Boolean buttonTypeNext, Id firstId, Id lastId, Integer recordsLimit, Id seasonId) {
        List<TV_Series__c> seriesList = new List<TV_Series__c>();
        if (buttonTypeNext == true) {
            // Fetch records with number greater than the lastEpisodeNumber
            seriesList = [SELECT Id, Series_Name__c, Category__c, Description__c, Trailer_URL__c, Picture_URL__c  FROM TV_Series__c WHERE Id > :lastId ORDER BY Id ASC LIMIT :recordsLimit];
        } else if (buttonTypePrevious == true) {
            // Fetch records with number less than the firstEpisodeNumber
            seriesList = [SELECT Id, Series_Name__c, Category__c, Description__c, Trailer_URL__c, Picture_URL__c  FROM TV_Series__c WHERE Id < :firstId ORDER BY Id DESC LIMIT :recordsLimit];
        } else {
            // Fetch the first page of records
            seriesList = [SELECT Id, Series_Name__c, Category__c, Description__c, Trailer_URL__c, Picture_URL__c  FROM TV_Series__c ORDER BY Id ASC LIMIT :recordsLimit];
        }
        if (!seriesList.isEmpty()) {
            return seriesList;
        }
        return null;
    }

    @AuraEnabled(cacheable = true)
    public static Integer seriesRecordCount() {
        Integer countResult = [SELECT COUNT() FROM TV_Series__c];
        return countResult;
    }

    @AuraEnabled
    public static List<Episode__c> fetchMovies(Boolean buttonTypePrevious, Boolean buttonTypeNext, Id firstId, Id lastId, Integer recordsLimit, Id seasonId) {
        List<Episode__c> movieList = new List<Episode__c>();
        if (buttonTypeNext == true) {
            // Fetch records with number greater than the lastEpisodeNumber
            movieList = [SELECT Id, Name, Category__c, Description__c, Picture_URL__c FROM Episode__c WHERE RecordType.DeveloperName = 'Movie' AND Id > :lastId ORDER BY Id ASC LIMIT :recordsLimit];
        } else if (buttonTypePrevious == true) {
            // Fetch records with number less than the firstEpisodeNumber
            movieList = [SELECT Id, Name, Category__c, Description__c, Picture_URL__c FROM Episode__c WHERE RecordType.DeveloperName = 'Movie' AND Id < :firstId ORDER BY Id DESC LIMIT :recordsLimit];
        } else {
            // Fetch the first page of records
            movieList = [SELECT Id, Name, Category__c, Description__c, Picture_URL__c FROM Episode__c WHERE RecordType.DeveloperName = 'Movie' ORDER BY Id ASC LIMIT :recordsLimit];
        }
        if (!movieList.isEmpty()) {
            return movieList;
        }
        return null;
    }

    @AuraEnabled(cacheable = true)
    public static Integer moviesRecordCount() {
        Integer countResult = [SELECT COUNT() FROM Episode__c WHERE RecordType.DeveloperName = 'Movie' ];
        return countResult;
    }
}