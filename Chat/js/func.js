function entrar(){
    $("#entrar").click(function(){
        user = $("#user").val();
        if(user.length >= 3){
            $("#login").fadeOut(1000,function(){
                $("#chat").fadeIn(1000);
            });
        }
    });
}

// ENVIAR MENSAJE

function enviaMensaje(){
    $("#enviar").click(function(){
        mensaje = $("#mensaje").val();
        $("#mensaje").val("");
        $.ajax({
            async:true,
            type: "POST",
            dataType: "HTML",
            contentType: "application/x-www-form-urlencoded",
            url:"php/write.php",
            data: {user:user,mensaje:mensaje},
            beforeSend:inicioEnvio,
            //success:guardaMensaje,
            timeout:4000,
            error:problemas
        });
    });
}

// RECIBIR MENSAJES

function leerMensajes(){
    $.ajax({
        async:true,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url:"php/leer.php",
        beforeSend:inicioEnvio,
        success:escribeMensaje,
        timeout:4000,
        error:problemas
    });
}

function escribeMensaje(data){
    console.log("K ME DISE LOKO")
    $("#contenedor").html("");
    $("#contenedor").append(data);
}

// OPTIMIZAR ESPACIO BASE DE datos
function optimizarBaseDatos(){
    $.ajax({
        url:"php/optimizar.php",
        timeout:4000,
    });
}        

// FUNCIONES COMUNES DE AJAX

function inicioEnvio(){
    console.log("Se han enviado los datos del usuario al servidor");
}

function problemas(){
    console.log("No se ha podido procesar la solicitud");
}





