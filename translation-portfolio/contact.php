<?php
//../vendor/autoload.php
include("../vendor/phpmailer/phpmailer/class.phpmailer.php"); 
include("../vendor/phpmailer/phpmailer/class.smtp.php"); 
if(isset($_POST["submit"])) {
function test_gmail_smtp_basic() {
    // Uncomment as needed for debugging
    error_reporting(E_ALL);
    error_reporting(E_STRICT);
    // Set as needed
    date_default_timezone_set('America/New_York');
    $mail = new PHPMailer(); 
    // Optionally get email body from external file
    $message = $_POST["message"];
    $mail->IsSMTP();                            // telling the class to use SMTP
    $mail->Host       = "smtp.gmail.com";       // SMTP server
    $mail->SMTPDebug  = 2;                      // enables SMTP debug information (for testing)
                                                    // 0 default no debugging messages
                                                    // 1 = errors and messages
                                                    // 2 = messages only
    $mail->SMTPAuth   = true;                   // enable SMTP authentication
    //$mail->SMTPSecure = 'ssl';                // Not supported
    $mail->SMTPSecure = 'tls';                  // Supported
    $mail->Host       = "smtp.gmail.com";       // sets the SMTP server
    $mail->Port       = 587;                    // set the SMTP port for the GMAIL server
    $mail->Username   = "sharise245@gmail.com";         // SMTP account username (how you login at gmail)
    $mail->Password   = "kaykay";      // SMTP account password (how you login at gmail)
 
    $mail->setFrom('sharise245@gmail.com', 'Kayla');
 
    $mail->addReplyTo('sharise245@gmail.com', 'Kayla');
 
    $mail->Subject    = "PHPMailer Test Subject via smtp, basic with authentication";
 
    //$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
 
    $mail->msgHTML($message);
 
    $address = "kay_kay1424@yahoo.com";
    $mail->addAddress($address, "KC");
    // if you have attachments
   // $mail->addAttachment("phpmailer.gif");      // attachment 
    //$mail->addAttachment("phpmailer_mini.gif"); // attachment
 
    if(!$mail->Send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
      echo "Message sent!";
    }
}
test_gmail_smtp_basic();
}// end of isset
/*require_once "../vendor/autoload.php";

//PHPMailer Object
if(isset($_POST["submit"])) {
$mail = new PHPMailer;

$sender = $_POST["sender"];
$senderEmail = $_POST["senderEmail"];
//From email address and name
$mail->From = $senderEmail;
$mail->FromName = $sender;
$message =$_POST["message"];
//To address and name
$mail->addAddress("kay_kay1424@yahoo.com");
 //Recipient name is optional

//Address to which recipient will reply
//$mail->addReplyTo("reply@yourdomain.com", "Reply");

//CC and BCC
//$mail->addCC("cc@example.com");
//$mail->addBCC("bcc@example.com");

//Send HTML or Plain Text email
$mail->isHTML(true);

$mail->Subject = "Subject Text";
$mail->Body = "<i>$message</i>";
//$mail->AltBody = "This is the plain text version of the email content";

if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}
} // end of isset submit
if(isset($_POST["submit"])) {
    $recipient="kay_kay1424@yahoo.com";
    $phone = $_POST['phone'];
    $subject="Form to email message";
    $sender=$_POST["sender"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message\n$phone";

    @mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

   echo $thankYou="<p>Thank you! Your message has been sent.</p>";
}*/

?>
