<?php
    function encryptIt($q){
        $cryptKey = "M5JJS51NxpovqftuWSzeQL";
        $qEncoded = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($cryptKey), $q, MCRYPT_MODE_CBC, md5(md5($cryptKey))));
        $qEncoded = base64_encode($qEncoded);
		return($qEncoded);
    }
    
    function decryptIt($q){
        $q = base64_decode($q);
		$cryptKey = "M5JJS51NxpovqftuWSzeQL";
		$qDecoded = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($cryptKey), base64_decode($q), MCRYPT_MODE_CBC, md5(md5($cryptKey))), "\0");
		return($qDecoded);
    }
    
    function haveSpecialChr($string){
        if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $string)){
            return true;
        }else{
            return false;
        }
    }

    function antiDDOS(){
        if(!isset($_SESSION['last_session_request'])){
            $_SESSION['last_session_request'] = microtime(true);
        }else{
            if($_SESSION['last_session_request'] > microtime(true) - 0.05){
                $f = fopen(".htaccess", "a+");
                fwrite($f, "Deny from ".$_SERVER['REMOTE_ADDR']."\n");
                fclose($f);
                header("Refresh:0");
                exit;
            }
            $_SESSION['last_session_request'] = microtime(true);
        }
    }
?>