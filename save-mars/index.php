<!DOCTYPE HTML>
<html lang="es-ES">
	<head>
		<meta charset="UTF-8"/>
		<title>Spaceship Game</title>
		
		<!-- CSS -->
		<link type="text/css" rel="stylesheet" href="cdn/css/main.css"/>
		<link type="text/css" rel="stylesheet" href="cdn/css/startscreen.css"/>
		<!-- JS -->
		<script type="text/javascript" src="cdn/js/lib/jquery-3.1.1.min.js"></script>
	</head>
	<body>
		<!-- START SCREEN -->
		<div id="undefined-logo"></div>
		<!-- MENÚ DE INICIO -->
		<div id="main_menu">
			<div id="logo"></div>
			<ul id="startMenu">
				<li id="option1">Start</li>
				<li id="option2">Controls</li>
				<li id="option3">Best Score</li>
				<li id="option4">Exit</li>
				<div id="selected"></div>
			</ul>
			<ul id="startControls">
				<li>UP ARROW: move to top</li>
				<li>DOWN ARROW: move to bottom</li>
				<li>LEFT ARROW: move to left</li>
				<li>RIGHT ARROW: move to right</li>
				<li>SPACE BAR: shot the enemies</li>
				<li>Q: change the shot</li>
				<li id="option2">Back [Space Bar]</li>
			</ul>
			<ul id="startBest">
				<li id="titleBest">Best Score</li>
				<li id="bestRow"></li>
				<li id="option2">Back [Space Bar]</li>
			</ul>
		</div>
		<!-- CANVAS 1 -->
		<canvas id="lienzo" height=0 width=0 style="background:black">
		</canvas>
		<div id="explotions"></div>
		<div id="tutorial1">
			<p>¡Elimina a los enemigos para liberar a Marte!</p>
		</div>
		<div id="tutorial2">
			<p>¡Usa otro tipo de disparo para estos enemigos!</p>
		</div>
		<div id="noBalas">
			<p>¡No quedan balas!</p>
		</div>
		<div id="HUD">
			<div id="hud1">
				Heal points: 20
			</div>
			<div id="hud2">
				Ammo: 20
			</div>
			<div id="hud3">
				Score: 0
			</div>
		</div>
		<div id="music"></div>
		<div id="gameOver1">
			GAME OVER
		</div>
		<div id="gameOver2">
			0 pts
		</div>
		<div id="gameOver3">
			Press enter to start again...
		</div>

		<!--  JS -->
		<script type="text/javascript" src="cdn/js/init.js"></script>
		<script type="text/javascript" src="cdn/js/class/cHUD.js"></script>
		<script type="text/javascript" src="cdn/js/class/cBgobject.js"></script>
		<script type="text/javascript" src="cdn/js/class/cBackground.js"></script>
		<script type="text/javascript" src="cdn/js/class/cShip.js"></script>
		<script type="text/javascript" src="cdn/js/class/cPlayer.js"></script>
		<script type="text/javascript" src="cdn/js/class/cEnemy1.js"></script>
		<script type="text/javascript" src="cdn/js/class/cEnemy2.js"></script>
		<script type="text/javascript" src="cdn/js/class/cEnemy3.js"></script>
		<script type="text/javascript" src="cdn/js/class/cEnemy1Shot.js"></script>
		<script type="text/javascript" src="cdn/js/class/cShot.js"></script>
		<script type="text/javascript" src="cdn/js/class/cPlayerShot.js"></script>
		<script type="text/javascript" src="cdn/js/class/cRec.js"></script>
		<script type="text/javascript" src="cdn/js/class/cAsteroid.js"></script>
		<script type="text/javascript" src="cdn/js/startscreen.js"></script>
		<script type="text/javascript" src="cdn/js/functions.js"></script>
		<script type="text/javascript" src="cdn/js/main.js"></script>
	</body>
</html>