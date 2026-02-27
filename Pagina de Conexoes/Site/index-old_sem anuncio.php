<!DOCTYPE html>
<html id="fundogeral">
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

        <meta name="facebook-domain-verification" content="4clwvqmiunp15qa4j6ofk3iemzr27n" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/uikit.min.css" />
        <link rel="stylesheet" href="css/index.css" />
        <link rel="stylesheet" href="css/estilo.css" />
        <script src="js/uikit.min.js"></script>
        <script src="js/uikit-icons.min.js"></script>
        <script src="js/personalizado.js"></script>
        <title>Net e Cia Tecnologia</title>
    </head>

    <body class="">
        <div class="topo-desk uk-visible@m" ><!--topo para desk-->
            <div class="">
                <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
                    <div class="uk-navbar-left uk-margin-large-left">
                        <img id=logotopo src="./imagens/logobranca.png" style="width: 160px;">
                    <!--
                    <ul class="uk-navbar-nav">
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                    </ul>
                -->
                    </div>		
                    <div class="j-uk-navbar-right uk-navbar-right uk-margin-large-right" >
                        <ul class="uk-navbar-nav">
                            <!--<li><a href="#">HOME</a></li>-->
                            <li><a href="down.php">DOWNLOADS</a></li>
                            <li><a href="http://netecia.com.br/canal" target="_blank">VÍDEOS</a></li>
                            
                            <li><p id="bt-contato"><a class="j-topo-desk-uk-button uk-button" href="#rodape" uk-scroll>contato</a></p></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="sec-topo uk-container">
                <div class="j-topo-grid uk-text-center uk-grid-collapse" uk-grid>
                    <div class="j-bg-grid-0 uk-width-expand@s">
                        <div id="fundo-menu-grande" class="uk-card uk-card-default uk-card-body"><p id="p0" >Soluções em tecnologia para auxiliar a sua empresa.</p></div>
                    </div>
                    <div class="uk-width-1-6@s">
                        <a href="automacao.php" class="uk-link-toggle"><div class="j-bg-grid-1 uk-card uk-card-default uk-card-body"><p id="p1">AUTOMAÇÃO COMERCIAL</p></div></a>
                    </div>
                    <div class="uk-width-1-6@s">
                        <a href="telefonia.php" class="uk-link-toggle"><div class="j-bg-grid-2 uk-card uk-card-default uk-card-body"><p id="p2">TELEFONIA EM NUVEM</p></div></a>
                    </div>
                    <div class="uk-width-1-6@s">
                        <a href="#" class="uk-link-toggle"><div class="j-bg-grid-3 uk-card uk-card-default uk-card-body"><p id="p3">SERVIDORES</p></div></a>
                    </div>
                    <div class="uk-width-1-6@s">
                        <a href="#" class="uk-link-toggle"><div class="j-bg-grid-4 uk-card uk-card-default uk-card-body"><p id="p4">REDES</p></div></a>
                    </div>
                </div>	
            <br>
            </div>
        </div>



        <!--topo mobile-->

        <div class="uk-hidden@m"><!--oculta esta div em telas maiores que 640px-->
            <!-- This is a button toggling the off-canvas -->
            <div id="barra-topo-mb">
                <img id="logo-mob" class="uk-position-relative uk-position-center" src="./imagens/logobranca.png">
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
                            <!--<li><a href="index.php">HOME</a></li>-->
                            <li><a href="down.php">DOWNLOADS</a></li>
                            <li><a href="http://netecia.com.br/canal" target="_blank">VIDEOS</a></li>
                            <li><a href="index.php#rodape">CONTATO</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <!--imagens do mobile-->

            <div class="uk-container" style="padding: 0px;">
                <div id="img-mob" class="uk-text-center uk-grid-collapse" uk-grid>

                    <div id="img-mob0" class="uk-width-1-1@m">
                        <div class="uk-card uk-card-default uk-card-body"><h2 id="h2-img-mob0">Soluções em tecnologia para auxiliar a sua empresa.</h2></div>
                    </div>
                    <div id="img-mob1" class="uk-width-1-1@m">
                        <a href="automacao.php" class="uk-link-toggle"><div class="uk-card uk-card-default uk-card-body"><p id="p-img-mob1">Automação Comercial</p></div></a>	
                    </div>
                    <div id="img-mob2" class="uk-width-1-1@m">
                        <a href="telefonia.php" class="uk-link-toggle"><div class="uk-card uk-card-default uk-card-body"><p id="p-img-mob2">Telefonia em Nuvem</p></div></a>
                    </div>
                    <div id="img-mob3" class="uk-width-1-1@m">
                        <!--<a href="" class="uk-link-toggle">--><div class="uk-card uk-card-default uk-card-body"><p id="p-img-mob3">Servidores</p></div><!--</a> remover este comentario ao colocar o link-->	
                    </div>
                    <div id="img-mob4" class="uk-width-1-1@m">
                        <!--<a href="" class="uk-link-toggle">--><div class="uk-card uk-card-default uk-card-body"><p id="p-img-mob4">Redes</p></div><!--</a> remover este comentario ao colocar o link-->	
                    </div>

                    
                </div>
                
            </div>


        </div>
        <!-- include para o rodapé -->
        
    </body>

    
<!-- include para o rodapé -->
<?php include 'rodape.php'; ?>
</html>
