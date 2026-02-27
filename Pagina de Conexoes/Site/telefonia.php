<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-9PLZE6WTV8"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-9PLZE6WTV8');
	</script>

	<!--tag nova depois da criação do site de LP-->
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-206500440-1"></script>
	<script>
  		window.dataLayer = window.dataLayer || [];
  		function gtag(){dataLayer.push(arguments);}
  		gtag('js', new Date());

  		gtag('config', 'UA-206500440-1');
	</script>
	
	<title>TELEFONIA | Net e Cia</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/uikit.min.css" />
	<link rel="stylesheet" href="css/estilo.css" />
	<link rel="stylesheet" href="css/telefonia.css" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
	<script src="js/uikit.min.js"></script>
	<script src="js/uikit-icons.min.js"></script>
	<script src="js/personalizado.js"></script>
</head>

<!-- include para o arquivo do cabeçalho -->
<?php include 'cabeca.php'; ?>

<body>


	<!--DIV da imagem de topo-->
    <div class=sec-voip >
    	<div id="uk-voip" class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light" data-src="imagens/img-voip-top.png" uk-img>
    		<h1>Descubra as Vantagens da Telefonia em Nuvem para sua Empresa</h1>
    	</div>
    	
    </div>

    <div id="" class="voip-sec1">
		<div id="dispositivos">
			<img id="" src="./imagens/dispositivos.jpg">
			<div id="tenha">
				<h2 id="">Tenha sua equipe conectada em qualquer lugar.</h2>
			</div>
		</div>
    </div>


	<div class="voip-sec2">
		<div class="voip-sec2-texto">
			<p>
			Atenda os seus clientes de onde você estiver. Basta estar conectado a internet.<br/><br/>

			Não divulgue mais vários números de telefone para o seu cliente.
			Isso só faz com que seja menos provável dele guardá-los.<br/><br/>

			Não precisa mais passar o seu número pessoal para seus clientes.
			Quando eles te ligarem no seu número “fixo”, você poderá atender de onde 
			estiver ou até mesmo receber a ligação por transferência, vinda da sua empresa.<br/> <br/>

			Utilize o mesmo número para matriz e filiais. Assim o seu 
			cliente guardará com mais facilidade o seu número. Você pode usar um
			atendimento automático, com a opção da filial que ele deseja falar.<br/><br/>

			Tenha quantos ramais precisar.<br/><br/>

			Escolha quantas ligações simultâneas sua empresa irá receber com o mesmo número.<br/><br/>

			Agora ficou fácil ter funcionários em home office.  Além de poder atender s
			eus clientes, ele terá um fácil comunicação com o restante da sua equipe.<br/><br/>


			</p>
		</div>
	</div>

	<div class="voip-sec3">
		<div class="uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid>
			<div id="voip-sec3-1">
				<div class="voip-sec3-2" class="uk-card uk-card-default uk-card-body">
					<div class="bloco1">
						<p>1 número telefônico<br/>

							2 canais para recebimento de ligações<br/>

							2 canais para efetuar ligações<br/>

							5 ramais<br/>

							200 minutos para efetuar ligações
							fixo e móvel<br/>

							ligações ilimitadas entre ramais<br/>
						</p>
						<p id="preco" ><span id="rs">R$</span> 150,00/mês</p>
					</div>
				</div>
			</div>
		<div>
			<div class="uk-card uk-card-default uk-card-body">
				<div class="bloco1">
					<form action="./formularios/envio_voip.php" method="post">
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
				</div>
			</div>
		</div>
		
		</div>


	</div>

	<section class="sec-video">
		<div class="video-voip">
			<!--<h2>Assista o vídeo abaixo e confira várias funções que o GFOOD tem a te oferecer.</h2>-->
			<!--
			<button class="uk-button uk-button-default uk-margin-bottom" type="button" uk-toggle="target: +">Ocultar o vídeo</button>-->

			<iframe src="https://www.youtube.com/embed/UWM9HxOxdGk?autoplay=0&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1" width="1366" height="768" frameborder="0" allowfullscreen uk-responsive uk-video="automute: true"></iframe>
			</div>

	</section>




    


<!-- include para o rodapé -->
<?php include 'rodape.php'; ?>
</body>
</html>