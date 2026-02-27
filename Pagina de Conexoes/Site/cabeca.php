<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/uikit.min.css" />
	<link rel="stylesheet" href="css/estilo.css" />
	<link rel="stylesheet" href="css/voip.css" />
	<script src="js/uikit.min.js"></script>
	<script src="js/uikit-icons.min.js"></script>
	<script src="js/personalizado.js"></script>
</head>


<header>
		<!--MENU-->
	<!--*menu desk-->
	<div class="j-topo-voip-desk uk-visible@m" ><!--topo para desk-->
		<div class="cabecamenu">
			<nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
				<div class="uk-navbar-left uk-margin-large-left">
					<a href="index.php"><img src="./imagens/logobranca.png" style="width: 160px;"></a>
    			<!--
		        <ul class="uk-navbar-nav">
		            <li><a href="#">Item</a></li>
		            <li><a href="#">Item</a></li>
		            <li><a href="#">Item</a></li>
		        </ul>
		    -->
		</div>		
		<div class="j-menu-uk-navbar-right uk-navbar-right uk-margin-large-right" >
			<ul class="j-menu-uk-navbar-nav uk-navbar-nav">
				<li class="j-item-menu-topo"><a href="index.php">HOME</a></li>
				<li><a href="down.php">DOWNLOADS</a></li>
				<li><a href="http://netecia.com.br/canal" target="_blank">VÍDEOS</a></li>

				<li><p id="bt-contato"><a class="j-topo-desk-uk-button uk-button" href="#rodape" uk-scroll><span class="j-bt-contato">contato</span></a></p></li>
			</ul>
		</div>
	</nav>
</div>

</div>
<!--menu mobile-->
<!--topo mobile-->
<div class="j-topo-mob uk-hidden@m"><!--oculta esta div em telas maiores que 640px-->
	<!-- This is a button toggling the off-canvas -->
	<div id="barra-topo-mb">
		<a href="index.php"><img id="logo-mob" class="uk-position-relative uk-position-center" src="./imagens/logobranca.png"></a>
		<div id="btMenu" class="btMenuIndex"> <!--criei esta div, só p personalizar o botao menu-->
			<button uk-toggle="target: #my-id" type="button" uk-icon="menu"></button> 
		</div>
	</div>

	    	<!-- This is an anchor toggling the off-canvas 
	    		<a href="#my-id" uk-toggle>Menu</a> -->

	    		<!-- This is the off-canvas -->
	    		<div id="my-id" uk-offcanvas>
	    			<div class="uk-offcanvas-bar">
	    				<button class="uk-offcanvas-close" type="button" uk-close ></button>

	    				<nav class="">
	    					<ul class="uk-list">
	    						<li><a href="index.php">HOME</a></li>
	    						<li><a href="down.php">DOWNLOADS</a></li>
	    						<li><a href="http://netecia.com.br/canal" target="_blank">VIDEOS</a></li>
	    						<li><a href="index.php#rodape">CONTATO</a></li>
	    					</ul>
	    				</nav>
	    			</div>
	    		</div>


	    	</div>
	<!--FIM DO MENU-->
</header>

<body>





</body>
</html>