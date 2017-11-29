// LOGIN //

$("#login").click(function(){
    user = $("#user").val();
    $.ajax({
        async:true,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url:"php/login.php",
        data: {user: $("#user").val(),posx: 5},
        beforeSend:ainicioEnvio,
        success:allegadaDatos,
        timeout:1000,
        error:aproblemas
    });
});

function ainicioEnvio(){

}

function allegadaDatos(datos){
    if(datos){
        iniciarJuego();
    }else{
        $("body").html("Algo ha fallado");
    }
}

function aproblemas(){
    console.log("No te has conectado correctamente.");
}

function iniciarJuego(){
    $("body").html("<canvas id='fondo'></canvas><canvas id='lienzo'></canvas>");
    start();
}
//____//
// CARGAR PARTIDA //
function loginDone(){
    $.ajax({
        async:true,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url:"php/logindone.php",
        data: "user="+user,
        beforeSend:binicioEnvio,
        success:bllegadaDatos,
        timeout:4000,
        error:aproblemas
    });
}

function binicioEnvio(){

}

function bllegadaDatos(datos){
    if(datos){
        var res = datos.split(",");
        user = res[0];
        wood = res[1];      wood = parseInt(wood); 
        health = res[2];    health = parseInt(health);
        row = res[3];       row = parseInt(row);
        column = res[4];    column = parseInt(column);

       // console.log(user+"//"+wood+"//"+health+"//"+row+"//"+column);
    }else{
        $("body").html("Algo ha fallado");
    }
}

// ACTUALIZAR POSICIONES.

function actualizaPosiciones(){
    $.ajax({
        async:true,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url:"php/escribeposiciones.php",
        data: {user:user, row:row , column:column, health:health, wood:wood},
        beforeSend:binicioEnvio,
        success:cllegadaDatos,
        timeout:4000,
        error:aproblemas
    });
}
function cllegadaDatos(){
    //console.log("Se ha actualizado la posición del jugador");
}
// TOUCH SWIPE
function touchSwipe(){
    $("canvas").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            console.log(direction);
            if(!animado){
                switch(direction){
                    case "right":
                        column++;
                        break;
                    case "left":
                        column--;
                        break;
                    case "up":
                        row--;
                        break;
                    case "down":
                        row++;
                        break;
                    default:
                        console.log("k dise mi ninio");
                        break;
                }
                actualizaPosiciones();
                //TWEEN
                drawTween();
                if(!animateIniciado){
                    animate();
                }  
            }
        },
    threshold:(windowWidth*squarePx/canvasWidth)/3
    });
}

// TERRAIN
function drawTerrain(){
    for(var r = 0;r<18;r++){
        for(var c = 0;c<32;c++){
            ctxBg.drawImage(terrainImg,squarePx*c,squarePx*r,squarePx,squarePx);  
        }
        for(var t in tree){
            tree[t].draw();
        }
    }
}


function clicArboles(){
    $("#lienzo").mousedown(function(e){
        if(!animado){
            var clickX = Math.floor(e.pageX/(windowWidth/canvasWidth)/squarePx);
            var clickY = Math.floor(e.pageY/(windowWidth/canvasWidth)/squarePx);
            console.log("toma click nano"+clickX+"/"+clickY);
            for(var t in tree){
                if(tree[t].row == clickY && clickX == tree[t].column){
                    console.log("aqui hay un arbol");
                    if(Math.abs(tree[t].row-row) <=1 && Math.abs(tree[t].column-column) <=1){                       
                        tree.splice(t,1);
                        console.log("Has talado el arbol");
                        wood+=100;
                        actualizaPosiciones();
                        ctxBg.clearRect(0,0,canvasWidth,canvasHeight);
                        drawTerrain();
                    }   
                }
            }
        }

    });
}
			


