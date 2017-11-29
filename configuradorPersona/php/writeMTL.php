<?php
    $myfile = fopen("../modelos/personaje.mtl", "w") or die("Unable to open file!");
    $txt = "
    newmtl default
    Ns 96.078431
    Ka 1.000000 1.000000 1.000000
    Kd ".$_GET['r']." ".$_GET['g']." ".$_GET['b']."
    Ks 0.200000 0.200000 0.200000
    Ke 0.000000 0.000000 0.000000
    Ni 1.000000
    d 1.000000
    illum 2
    ";
    
    fwrite($myfile, $txt);
    fclose($myfile);
?>