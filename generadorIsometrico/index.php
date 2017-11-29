<html>
    <head>
        <script src="jquery-3.1.1.min.js"></script>
        <style>
            body,html{margin:0px;padding:0px;overflow:hidden;}
            #canvas{background:palegreen;}
        </style>
    </head>
    <body>
        <canvas id="canvas" width=512px height=512px></canvas>
    </body>
        <script>
        var terrainImg = [];
			<?php
				$a = scandir("img/terrain/");
				for($i = 2;$i<count($a);$i++){
                    $n = $i-2;
					echo "terrainImg[".$n."] = new Image();";
					echo "terrainImg[".$n."].src = 'img/terrain/".$a[$i]."';
					";
				}
			?>


        var treeImg = [];
			<?php
				$a = scandir("img/tree/");
				for($i = 2;$i<count($a);$i++){
                    $n = $i-2;
					echo "treeImg[".$n."] = new Image();";
					echo "treeImg[".$n."].src = 'img/tree/".$a[$i]."';
					";
				}
			?>
        console.log(treeImg);
        </script>

        <!--CLASS-->
        <script src="js/class/cTile.js"></script>
        <script src="js/class/cTree.js"></script>
        <script src="js/class/cBuild.js"></script>
        <!-- Global -->
        <script src="js/init.js"></script>
        <script src="js/functions.js"></script>
        <script src="js/main.js"></script>
</html>


