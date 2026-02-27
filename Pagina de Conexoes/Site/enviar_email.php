<?php

/* apenas dispara o envio do formulário caso exista $_POST['enviarFormulario']*/

if (isset($_POST['enviarFormulario'])){

/*** INÍCIO - DADOS A SEREM ALTERADOS DE ACORDO COM SUAS CONFIGURAÇÕES DE E-MAIL ***/

$enviaFormularioParaNome = 'Nome do destinatário que receberá formulário';
$enviaFormularioParaEmail = 'suporte1@netecia.com.br';

$caixaPostalServidorNome = 'WebSite | Formulário';
$caixaPostalServidorEmail = 'site@netecia.com.br';
$caixaPostalServidorSenha = '!Q0.^I7oPsMY';

/*** FIM - DADOS A SEREM ALTERADOS DE ACORDO COM SUAS CONFIGURAÇÕES DE E-MAIL ***/ 

/* abaixo as veriaveis principais, que devem conter em seu formulario*/

$remetenteNome  = $_POST['remetenteNome'];
$remetenteEmail = $_POST['remetenteEmail'];
$assunto  = $_POST['assunto'];
$mensagem = $_POST['mensagem'];

$mensagemConcatenada = 'Formulário gerado via website'.'<br/>'; 
$mensagemConcatenada .= '-------------------------------<br/><br/>'; 
$mensagemConcatenada .= 'Nome: '.$remetenteNome.'<br/>'; 
$mensagemConcatenada .= 'E-mail: '.$remetenteEmail.'<br/>'; 
$mensagemConcatenada .= 'Assunto: '.$assunto.'<br/>';
$mensagemConcatenada .= '-------------------------------<br/><br/>'; 
$mensagemConcatenada .= 'Mensagem: "'.$mensagem.'"<br/>';

/*********************************** A PARTIR DAQUI NAO ALTERAR ************************************/ 

require_once('PHPMailer-master/PHPMailerAutoload.php');
//require_once('PHPMailer-master/src/PHPMailer.php');

$mail = new PHPMailer();

$mail->IsSMTP();
$mail->SMTPAuth  = true;
$mail->Charset   = 'utf8_decode()';
$mail->Host  = 'mail.suporte1.net.br';
$mail->Port  = '26';
$mail->Username  = $caixaPostalServidorEmail;
$mail->Password  = $caixaPostalServidorSenha;
$mail->From  = $caixaPostalServidorEmail;
$mail->FromName  = utf8_decode($caixaPostalServidorNome);
$mail->IsHTML(true);
$mail->Subject  = utf8_decode($assunto);
$mail->Body  = utf8_decode($mensagemConcatenada);

$mail->AddAddress($enviaFormularioParaEmail,utf8_decode($enviaFormularioParaNome));

if(!$mail->Send()){
$mensagemRetorno = 'Erro ao enviar formulário: '. print($mail->ErrorInfo);
}else{
$mensagemRetorno = 'Formulário enviado com sucesso!';
} 

}
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8">
<title>Formulário Exemplo Autenticado</title>

</head>

<body>

<?php
if(isset($mensagemRetorno)){
echo $mensagemRetorno;
}

?>

<form method="POST" action="" style="width:300px;">
<input type="text" name="remetenteNome" placeholder="Nome completo" style="float:left;margin:10px;">
<input type="text" name="remetenteEmail" placeholder="Email" style="float:left;margin:10px;">
<input type="text" name="assunto" placeholder="Assunto" style="float:left;margin:10px;">
<textarea name="mensagem" placeholder="Mensagem" style="float:left;margin:10px;height:100px;width:200px;"></textarea>
<input type="submit" value="enviar" name="enviarFormulario" style="float:left;margin:10px;">
</form>

</body>
</html>
