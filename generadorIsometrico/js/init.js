var temporizador="";
var fps = 30;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var gridSize = 80;
var gridProySize = gridSize*0.8943885546;               //cos(26.57)
//var diagonal = 1646.461964334433;                     //Math.sqrt(Math.pow(canvasHeight,2)+Math.pow(canvasWidth,2));
var cursorX = 0;
var cursorY = 0;
// MOVIMIENTO CÁMARA
var gapX = 0;
var gapY = 0;

//CARGA DE IMÁGENES
var cursor1 = new Image();
cursor1.src = "img/cursor/1.png";
var cursor2 = new Image();
cursor2.src = "img/cursor/2.png";
var barrack = new Image();
barrack.src ="img/building/1.png";

// Tipo de edición
var editType = true;

tile = [];
var tileAccept = true;
var tileLineNumber = 75;

for(var i = 0;i<tileLineNumber;i++){
    for(var j = 0;j<tileLineNumber;j++){
        var x = i*40;
        var y = j*40;
        tile.push(new cTile(x,y));
        console.log("tile created");
    }
}
console.log(tile.length);


// CREACIÓN DE LAS POSICIONES INICIALES ALEATORIAS DE LOS CENTROS DE CIUDAD
var build = [];
var numJugadores = 2;
for(var i = 0;i<numJugadores;i++){
    var tempx = Math.round(Math.random()*(tileLineNumber*40));
    var tempy = Math.round(Math.random()*(tileLineNumber*40));
    tempx = tempx-tempx%40;
    tempy = tempy-tempy%40;
    build.push(new cBuild(tempx,tempy));
}

    for(var t in tile){
        console.log(1)
    }

// CREO UN CAMINO ENTRE CENTROS DE CIUDAD
var caminoColumna = build[0].columna;
var caminoFila = build[0].fila;
do{
    if(Math.round(Math.random()*1) == 0){
        if(caminoColumna < build[1].columna){
            caminoColumna++;
        }else if(caminoColumna > build[1].columna){
            caminoColumna--;
        }
    }else{
        if(caminoFila < build[1].fila){
            caminoFila++;
        }else if(caminoFila > build[1].fila){
            caminoFila--;
        }
    }
    for(var t in tile){
        if(tile[t].columna == caminoColumna &&  tile[t].fila == caminoFila){
            tile[t].type = 2;
            console.log("he asignado camino a una nueva celda");
        }
    } 
    console.log("Build1[C:"+build[0].columna+",F:"+build[0].fila+"] // Build2[C:"+build[1].columna+" F:"+build[1].fila+"] // Camino[C:"+caminoColumna+" F:"+caminoFila+"]");  
}while(caminoFila != build[1].fila || caminoColumna != build[1].columna);


var treeNumber = Math.ceil(Math.random()*10000);

for(var i = 1;i<=treeNumber;i++){
    var x = Math.ceil(Math.random()*tileLineNumber-1)*(gridSize/2);
    var y = Math.ceil(Math.random()*tileLineNumber-1)*(gridSize/2);
    var crear = true;
    for(var t in tree){
        if(x/40 == tree[t].columna && y/40 == tree[t].fila){
            console.log("duplicado");
            crear = false;
        }
    }
    if(crear){
        tree.push(new cTree(x,y));
    }
    
}

for(var r in tree){
    for(var i in tile){
        if(tree[r].fila == tile[i].fila && tree[r].columna == tile[i].columna && tile[i].type == 2){
            tree.splice(r, 1);
            continue;
        }
    }
}


