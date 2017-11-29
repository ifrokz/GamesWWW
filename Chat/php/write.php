<?php 

    include "inc/injection.php";

    $db = new SQLite3('../db/chat.db');
    
    $puedes = true;

    $results = $db->query("
        SELECT *
        FROM mensajes
        WHERE utc = '".date('U')."'
    ");

    while ($row = $results->fetchArray()) {
		$puedes = false; // SI EXISTE UNA FILA, PUEDES=FALSE
        echo "Has enviado mensajes demasiado rapido";
	}

    // Meter el mensaje en la base de datos
    if($puedes){
        $consulta = $db->exec("
            INSERT INTO mensajes
            VALUES 
            (
                '".$_POST['user']."',
                '".$_POST['mensaje']."',
                '".date('U')."',
                '".$_SERVER['REMOTE_ADDR']."'
            )
        ");
        echo "Se ha completado correctamente.";
    }
   
?>