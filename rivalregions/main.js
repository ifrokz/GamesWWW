$(document).ready(function (){
    OroANivel();
    NivelAOro();
});

function OroANivel(){ // Oro a nivel
    $("#OroToNivel").click(function(){
        var oro = $("#oro").val();
        var nivelActual = $("#oroNivelActual").val();
        if(oro && nivelActual){
            $("#resOro").val(OroToNivel(oro, nivelActual));
        }else
            alert("Rellena todos los campos.");
    });
}

function NivelAOro(){ // Nivel a oro
    $("#NivelToOro").click(function(){
        var nivel = null;
        nivel = $("#nivel").val();
        var nivelActual = null;
        nivelActual = $("#NivelNivelActual").val();
        if(nivel && nivelActual){
            console.log(NivelToOro(nivel) - NivelToOro(nivelActual));
            $("#resNivel").val(NivelToOro(nivel) - NivelToOro(nivelActual));
        }else
            alert("Rellena todos los campos.");
    });
}


function NivelToOro (nivel){
    if(nivel == 0)
        return 0;
    return nivel == 1 ? 500 : (nivel * 5 ) + NivelToOro ( nivel - 1) ;
}

function OroToNivel(oro, nivelActual){
    while( oro >= (nivelActual+1) * 5){
        if(nivelActual == 0){
            if(oro>= 500){
                nivelActual++; 
                oro -= 500;
            }else break;
        }else{
            nivelActual ++;
            oro -= nivelActual * 5;
        }
    }
    
    return nivelActual;
}