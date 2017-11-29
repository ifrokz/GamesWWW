<?php 

    include "inc/inject.php";

	$bd = new SQLite3('../db/zelda.db');
	
    $puedes = true;

	$results = $bd->query("
    SELECT * 
    FROM players 
    WHERE user = '".$_POST['user']."'
    ");

	
    // RECORRE LAS FILAS DEL RESULTADO
    while ($row = $results->fetchArray()) {
		$puedes = false; // SI EXISTE UNA FILA, PUEDES=FALSE
        echo true;
	}

	if($puedes == true){    // SI PUEDES, TE CREA EL USUARIO
		$bd->exec("
			INSERT INTO players
            VALUES 
            (
            '".$_POST['user']."',
            0,
            0,
            100,
            0,
            '".date('U')."',
            0,
            0
            )
        ");
        echo true;  
	}
?>