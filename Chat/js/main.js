$(document).ready(function(){
    entrar();
    enviaMensaje();

    temp = setTimeout("loop();",2000);
});

function loop(){
    leerMensajes();
    optimizarBaseDatos();

    // MUESTRA SIEMPRE LOS NUEVOS MENSAJES
    $("#contenedor").scrollTop(10000);
    
    clearTimeout(temp);
    temp = setTimeout("loop();",1000);
}