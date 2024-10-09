public class EmailService {
    public static void sendMail(List<String> address, String subject, String body) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(address);
        mail.setSubject(subject);
        mail.setPlainTextBody(body);
        
        Messaging.SendEmailResult[] results = Messaging.sendEmail(
        new Messaging.SingleEmailMessage[] { mail });
    }
}