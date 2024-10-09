public class RatingsBatchScheduler implements Schedulable {
    public void execute(SchedulableContext ctx) {
        RatingSummaryBatch ratingBatch = new RatingSummaryBatch();
        Id batchId = Database.executeBatch(ratingBatch);
    }
}