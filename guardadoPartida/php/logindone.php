<?php 

    include "inc/inject.php";

    $bd = new SQLite3('../db/zelda.db');

    $results = $bd->query("
    SELECT *
    FROM players
    WHERE user='".$_POST['user']."'
    ");

    while ($row = $results->fetchArray()) {
        echo $row['user'].",".$row['wood'].",".$row['health'].",".$row['row'].",".$row['column'];
    }
?>