<?php 

    include "inc/injection.php";

    $db = new SQLite3('../db/chat.db');

    $results = $db->query("
        DELETE
        FROM mensajes
        WHERE
        utc < '".(date('U')-(60*60))."'
    ");
?>