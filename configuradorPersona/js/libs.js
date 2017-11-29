function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: (parseInt(result[1], 16)/255).toFixed(6),
        g: (parseInt(result[2], 16)/255).toFixed(6),
        b: (parseInt(result[3], 16)/255).toFixed(6)
    } : null;
}

function escribirMTL(){
    var torgb = hexToRgb($("#colorpicker").val());
    
    $.ajax({
        url : 'php/writeMTL.php',
        data : { r: torgb.r, g: torgb.g, b:torgb.b },
     
        // especifica si será una petición POST o GET
        type : 'GET',
     
        // el tipo de información que se espera de respuesta
        dataType : 'html',

        success : function(json) {
            window.location = window.location;
        },
     
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
}
