<?php

    include "inc/inject.php";

    $bd = new SQLite3('../db/zelda.db');
    
    $results = $bd->query("
        UPDATE players
        SET 
        row=".$_POST['row'].",
        column=".$_POST['column'].",
        wood=".$_POST['wood'].",
        health=".$_POST['health']."
        WHERE
        user='".$_POST['user']."'
    ");
    echo "se ha actualizado el jugador";
    
?> 