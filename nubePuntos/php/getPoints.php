<?php
    
    $myfile = fopen("../modelos/puntos.txt", "r") or die("Unable to open file!");
    $json = fread($myfile,filesize("../modelos/puntos.txt"));
    fclose($myfile);
    
    echo $json
?>