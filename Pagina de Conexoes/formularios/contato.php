<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Fale conosco</title>
	<!--uikit-->
	<link rel="stylesheet" href="../css/uikit.min.css" />
    <script src="../js/uikit.min.js"></script>
    <script src="../js/uikit-icons.min.js"></script>
</head>
<body>
<form action="envio.php" method="post">
    <fieldset class="uk-fieldset">
        <legend class="uk-legend">Preencha os dados abaixo:</legend>
        <div class="uk-margin">
            <input class="uk-input" type="text" name="nome" placeholder="Nome completo" aria-label="Input">
        </div>
		<div class="uk-margin">
            <input class="uk-input" type="text" name="telefone" placeholder="telefone de contato" aria-label="Input">
        </div>
		<div class="uk-margin">
            <input class="uk-input" type="email" name="email" placeholder="e-mail" aria-label="Input">
        </div>
        <div class="uk-margin">
            <textarea class="uk-textarea" name="msg" rows="5" placeholder="Descreva aqui suas dúvidas." 
			aria-label="Textarea"></textarea>
        </div>
    </fieldset>
	<input type="submit" name="enviar" value="Enviar">
</form>












<!--

	<form action="envio.php" method="post">
		<div>
			<input type="text" name="nome" placeholder="Nome">
		</div>
		<div>
			<input type="email" name="email" placeholder="email">
		</div>
		<div>
			<textarea name="msg"></textarea>
		</div>
		<input type="submit" name="enviar">
	</form>

-->
</body>
</html>