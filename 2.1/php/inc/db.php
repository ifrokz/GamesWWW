<?php

    $db =  mysql_connect('db681040062.db.1and1.com', 'dbo681040062', '123456789');
    if (!$db) {
        die(mysql_error());
    }
    
    mysql_select_db('db681040062') or die('No se pudo seleccionar la base de datos');

?>