<?php 

    include "inc/injection.php";

    $db = new SQLite3('../db/chat.db');

    $results = $db->query("
        SELECT * 
        FROM    
            (
            SELECT * 
            FROM mensajes 
            ORDER BY utc 
            DESC 
            limit 20
            ) 
        ORDER BY utc 
        ASC
    ");

    while($row = $results->fetchArray()){
        echo "<hr><strong>".$row['user'].": </strong>".$row['msj']."<br>";
    }
?>