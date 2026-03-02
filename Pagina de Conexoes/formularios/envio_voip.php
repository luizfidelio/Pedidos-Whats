<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

if (isset($_POST['enviar'])) {

    $mail = new PHPMailer(true);

    try {
        //Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'summers.hmnoc.net';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'site@netecia.com.br';                     //SMTP username
        $mail->Password   = 'jak.=(w_{J6o';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('suporte1@netecia.com.br', 'Net e Cia');
        $mail->addAddress('suporte1@netecia.com.br', 'Josevã');     //Add a recipient
        $mail->addReplyTo('suporte1@netecia.com.br', 'Information');
        $mail->addCC($_POST['email']);
        



        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Contato Site Telefonia';
                
        $body = "Mensagem enviada pelo formulário do site: <br>
            Nome: " . $_POST['nome'] . "<br>
            Telefone: " . $_POST['telefone'] . "<br>
            E-mail: " . $_POST['email'] . "<br>
            Mensagem: <br> " . 
            $_POST['msg'] . "<br>
            ";

        $mail->Body = utf8_decode($body);

        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'E-mail enviado com sucesso!!';
    } catch (Exception $e) {
        echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    } /*else {
       // echo "Erro ao enviar e-mail. O acesso não foi via formulário."
    }*/
}

