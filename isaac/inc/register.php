<?php
    include "lib/injection.php";
    include "lib/db.php";
    include "lib/utils.php";
    
    // Check if have POST info
    if(!isset($_POST['user']) || !isset($_POST['pass']) || !isset($_POST['repass']) || !isset($_POST['email'])){
        echo "No deberías estar entrando aquí wey";
        die;
    }
    
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $repassword = $_POST['repass'];
    $email = $_POST['email'];
    
    if(strlen($username) < 3 || strlen($username) > 20){
        die("Tu id de usuario no cumple con los requisitos.");
    }else{
        if(strlen($password) < 3 || strlen($password) > 20){
            die("Tu contraseña no cumple con los requisitos.");
        }else{
            if(strlen($repassword) < 3 || strlen($repassword) > 20){
                die("Tu contraseña no cumple con los requisitos.");
            }else{
                if($password != $repassword){
                    die("Las contraseñas no coinciden.");
                }else{
                    if((substr_count($email, "@") == 0) || strlen($email) < 6){
                        die("Tu email no cumple con los requisitos.");
                    }else{
                        // Puedes registrar la cuenta
                        $username = encryptIt($username);
                        $password = encryptIt($password);
                        $repassword = encryptIt($repassword);
                        $email = encryptIt($email);
                        $ip = encryptIt($_SERVER['REMOTE_ADDR']);
                        $date_now = time();
                        
                        $db = new PDO($connect_db, $user_db, $pass_db);
                        $query = $db->prepare("INSERT INTO account VALUES('', :username, :password, 'a', :email, $date_now, 'WAIT', $date_now, 1, 0, :ip);");
                        $query->bindParam(':username', $username, PDO::PARAM_STR, 32);
                        $query->bindParam(':password', $password, PDO::PARAM_STR, 32);
                        $query->bindParam(':email', $email, PDO::PARAM_STR, 32);
                        $query->bindParam(':ip', $ip, PDO::PARAM_STR, 32);
                        $query->execute();
                        $db = null;
                        $query = null;
                        $username = null;
                        $password = null;
                        $email = null;
                        $ip = null;
                        echo "Tu cuenta se ha registrado correctamente.";
                    }
                }
            }
        }
    }
?>