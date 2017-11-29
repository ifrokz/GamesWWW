// This file contain some extra functions to make login form easier
function loginUtils(){
    
    $("#registerInLogin").click(function(){
        $("#loginInputs").fadeOut(500, function(){
            $("#registerInputs").fadeIn(500);
        });
    });
    $("#backtoLogin").click(function(){
        $(this).parent().fadeOut(500, function(){
            $("#loginInputs").fadeIn(500);
        });
    });
    
    // Check characters
    $("#userRegister").keyup(function(key){
        if(key.which == 32){
            event.preventDefault();
        }else if(key.which == 8){
            var inputValue = $("#userRegister").val();
            inputValue = inputValue.length+1;
            $("#userRegister").css("border", "2px solid");
            if(inputValue < 4){
                $("#userRegister").css("border-color", "red");
            }else{
                $("#userRegister").css("border-color", "green");
            }
        }else{
            var inputValue = $("#userRegister").val();
            inputValue = inputValue.length+1;
            $("#userRegister").css("border", "2px solid");
            if(inputValue < 4 || inputValue > 21){
                $("#userRegister").css("border-color", "red");
            }else{
                $("#userRegister").css("border-color", "green");
            }
        }
    });
    $("#passRegister").keyup(function(key){
        if(key.which == 32){
            event.preventDefault();
        }else if(key.which == 8){
            var inputValue = $("#passRegister").val();
            inputValue = inputValue.length+1;
            $("#passRegister").css("border", "2px solid");
            if(inputValue < 6){
                $("#passRegister").css("border-color", "red");
            }else{
                $("#passRegister").css("border-color", "green");
            }
        }else{
            var inputValue = $("#passRegister").val();
            inputValue = inputValue.length+1;
            $("#passRegister").css("border", "2px solid");
            if(inputValue < 4 || inputValue > 21){
                $("#passRegister").css("border-color", "red");
            }else{
                $("#passRegister").css("border-color", "green");
            }
        }
    });
    $("#repassRegister").keyup(function(key){
        if(key.which == 32){
            event.preventDefault();
        }else if(key.which == 8){
            var inputValue = $("#repassRegister").val();
            inputValue = inputValue.length+1;
            $("#repassRegister").css("border", "2px solid");
            if(inputValue < 6){
                $("#repassRegister").css("border-color", "red");
            }else{
                if($("#repassRegister").val() != $("#passRegister").val()){
                    $("#repassRegister").css("border-color", "red");
                    $("#repassRegister").get(0).setCustomValidity("Las contraseñas no coinciden");
                }else{
                    $("#repassRegister").css("border-color", "green");
                    $("#repassRegister").get(0).setCustomValidity("");
                }
            }
        }else{
            var inputValue = $("#repassRegister").val();
            inputValue = inputValue.length+1;
            $("#repassRegister").css("border", "2px solid");
            if(inputValue < 4 || inputValue > 21){
                $("#repassRegister").css("border-color", "red");
            }else{
                if($("#repassRegister").val() != $("#passRegister").val()){
                    $("#repassRegister").css("border-color", "red");
                    $("#repassRegister").get(0).setCustomValidity("Las contraseñas no coinciden");
                }else{
                    $("#repassRegister").css("border-color", "green");
                    $("#repassRegister").get(0).setCustomValidity("");
                }
            }
        }
    });
    $("#emailRegister").keyup(function(key){
        if(key.which == 32){
            event.preventDefault();
        }else if(key.which == 8){
            var inputValue = $("#emailRegister").val();
            var checkDot = inputValue;
            var reg = new RegExp("@");
            var matches = reg.test(checkDot);
            inputValue = inputValue.length+1;
            $("#emailRegister").css("border", "2px solid");
            if(matches){
                if(inputValue < 9){
                    $("#emailRegister").css("border-color", "red");
                }else{
                    $("#emailRegister").css("border-color", "green");
                }
            }else{
                $("#emailRegister").css("border-color", "red");
            }
        }else{
            var inputValue = $("#emailRegister").val();
            var checkDot = inputValue;
            var reg = new RegExp("@");
            var matches = reg.test(checkDot);
            inputValue = inputValue.length+1;
            $("#emailRegister").css("border", "2px solid");
            if(matches){
                if(inputValue < 7 || inputValue > 65){
                    $("#emailRegister").css("border-color", "red");
                }else{
                    $("#emailRegister").css("border-color", "green");
                }
            }else{
                $("#emailRegister").css("border-color", "red");
            }
        }
    });
    $(document).click(function(){
        var inputValue1 = $("#userRegister").val();
        if(inputValue1 != ""){
            inputValue1 = inputValue1.length+1;
            $("#userRegister").css("border", "2px solid");
            if(inputValue1 < 4 || inputValue1 > 21){
                $("#userRegister").css("border-color", "red");
            }else{
                $("#userRegister").css("border-color", "green");
            }
        }else{
            $("#userRegister").css("border", "0px solid");
        }
        
        var inputValue2 = $("#passRegister").val();
        if(inputValue2 != ""){
            inputValue2 = inputValue2.length+1;
            $("#passRegister").css("border", "2px solid");
            if(inputValue2 < 4 || inputValue2 > 21){
                $("#passRegister").css("border-color", "red");
            }else{
                $("#passRegister").css("border-color", "green");
            }
        }else{
            $("#passRegister").css("border", "0px solid");
        }
        
        
        var inputValue3 = $("#repassRegister").val();
        if(inputValue3 != ""){
            inputValue3 = inputValue3.length+1;
            $("#repassRegister").css("border", "2px solid");
            if(inputValue3 < 4 || inputValue3 > 21){
                $("#repassRegister").css("border-color", "red");
            }else{
                if($("#repassRegister").val() != $("#passRegister").val()){
                    $("#repassRegister").css("border-color", "red");
                    $("#repassRegister").get(0).setCustomValidity("Las contraseñas no coinciden");
                }else{
                    $("#repassRegister").css("border-color", "green");
                    $("#repassRegister").get(0).setCustomValidity("");
                }
            }
        }else{
            $("#repassRegister").css("border", "0px solid");
        }
        
        var inputValue4 = $("#emailRegister").val();
        if(inputValue4 != ""){
            var checkDot = inputValue4;
            var reg = new RegExp("@");
            var matches = reg.test(checkDot);
            inputValue4 = inputValue4.length+1;
            $("#emailRegister").css("border", "2px solid");
            if(matches){
                if(inputValue4 < 7 || inputValue4 > 65){
                    $("#emailRegister").css("border-color", "red");
                }else{
                    $("#emailRegister").css("border-color", "green");
                }
            }else{
                $("#emailRegister").css("border-color", "red");
            }
        }else{
            $("#emailRegister").css("border", "0px solid");
        }
        
    });
    $(".preventKey").keypress(function(key){
        if(key.which != 0 && key.which != 8 && key.which != 13 && key.which != 17 && key.which != 116){
            var character = String.fromCharCode(key.which);
            re = /[AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789]/gi;
            var isSpecial = re.test(character);
            if(!isSpecial){
                key.preventDefault();
            }
        }
    });
    $(".preventEmail").keypress(function(key){
        if(key.which != 0 && key.which != 8 && key.which != 13 && key.which != 17 && key.which != 116 && key.which != 45 && key.which != 46 && key.which != 95 && key.which != 64){
            var character = String.fromCharCode(key.which);
            re = /[AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789]/gi;
            var isSpecial = re.test(character);
            if(!isSpecial){
                key.preventDefault();
            }
        }
    });
    
    // Admin
    $("#talerLogin").click(function(){
        $("#loginInput").val("taler94bcn");
        $("#passwordInput").val("abcd12345");
    });
    $("#frokLogin").click(function(){
        $("#loginInput").val("dyfrok");
        $("#passwordInput").val("abcd12345");
    });
    
    
    
    
    
    
    
    
    
    //IVANCIONANO
    var contadordeivanes = 0;
    $("#login-button").click(function(){
        if(contadordeivanes == 0){
           console.log("Click");
            $("#hudLogin").fadeOut(500);
            $("#newhud").fadeOut(500);
            $("body").css("background-color","white");
            game.start(); 
            contadordeivanes ++;
        }
    });
}