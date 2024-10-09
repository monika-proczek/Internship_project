public with sharing class FilmListViewController {
    @AuraEnabled
    public static List<TV_Series__c> getTVSeries() {
        return TVSeriesService.getTVSeries();
    }

    @AuraEnabled
    public static TV_Series__c getSingleTVSeries(Id tvSeriesId) {
        return TVSeriesService.getSingleTVSeries(tvSeriesId);
    }

    @AuraEnabled
    public static List<Season__c> getSeasonsPerTVSeries(Id tvSeriesId){
        return SeasonService.getSeasonsPerTVSeries(tvSeriesId);
    }
    
    @AuraEnabled
    public static List<Episode__c> getEpisodesPerSeason(Id seasonId){
        return EpisodeService.getEpisodesPerSeason(seasonId);
    }

    @AuraEnabled
    public static Episode__c getSingleEpisode(Id episodeId){
        return EpisodeService.getSingleEpisode(episodeId);
    }

    @AuraEnabled
    public static List<Episode__c> getMovies(){
        return EpisodeService.getMovies();
    }

    @AuraEnabled
    public static Episode__c getMovie(Id movieId){
        return EpisodeService.getMovie(movieId);
    }

    @AuraEnabled
    public static void createNewRating(String stars, Id seriesId){
         RatingService.createNewRating(stars, seriesId);
    }

    @AuraEnabled
    public static  List<TV_Series__c> getTopSeries(){
        return TVSeriesService.getTopRatedSeries();
    }

    @AuraEnabled
    public static String getCurrentRating(Id seriesId){
         return RatingService.checkExistingScore(seriesId);
    }
}