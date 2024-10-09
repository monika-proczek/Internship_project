public class RatingSummaryBatch implements
Database.Batchable<sObject>, Database.Stateful{
    
    public Database.QueryLocator start(Database.BatchableContext bc) {
        //we take datetime 24 hours ago
        DateTime dayAgo = System.Now().AddDays(-1);
        return Database.getQueryLocator(
            'SELECT Id, Score__c FROM Rating__c WHERE CreatedDate = TODAY'
            );
        
    }
    public void execute(Database.BatchableContext bc, List<Rating__c> scope){
        // process each batch of records    
        Decimal averageRating;
        Decimal sumOfRatings = 0.0;
            
        if(scope.size() > 0) {
           
            
            for(Rating__c review: scope) {
                sumOfRatings = sumOfRatings + Integer.valueOf(review.Score__c);
            }
            averageRating = (sumOfRatings/scope.size()).setScale(2);
        }

        String emailAdress = 'monikaproczek9@gmail.com';
        String emailSubject = 'Daily update of new ratings';
        String emailBody ='Hi, the number of new ratings created today is: ' + scope.size();

        if(scope.size() > 0) {
            emailBody = emailBody + ', and the average rating for all is: ' + averageRating;

        }

        EmailService.sendMail(new List<String>{emailAdress}, emailSubject, emailBody);
    }
    
    public void finish(Database.BatchableContext bc){
    }
}