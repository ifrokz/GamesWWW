function drawRotatedImage(img, x, y, width, height, angle) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.drawImage(img, 0, -(height / 2), width, height);
	ctx.restore();
}
function prepareCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}
/*
// DIBUJA EL TABLERO (AUXILIAR EN DESARROLLO)
function drawGrid(){
    ctx.beginPath();
    for(var i = 10+100*3; i < 1920-100*5; i += 100){
        ctx.moveTo(40,i);
        ctx.lineTo(1040,i);
    }
    for(var i = 40; i < 1080; i += 100){
            ctx.moveTo(i,10+100*3);
            ctx.lineTo(i,1910-100*5);
            ctx.moveTo(i-1,10+100*3);
            ctx.lineTo(i-1,1910-100*5);
            ctx.moveTo(i+1,10+100*3);
            ctx.lineTo(i+1,1910-100*5);
    }
    ctx.closePath();
    ctx.stroke();
}
*/
////////////////////////
// LECTURA DE NIVELES //
////////////////////////

function prepareLevelCanvas(level,callBack){ //llama a draw level canvas, que llama a scanlevelcanvas que llama hidelevelcanvas que llama a start
    $("body").append('<canvas class=level id=levelCanvas width=10px height=11px></canvas>');
    levelCanvas = document.getElementById("levelCanvas");
    levelCtx = levelCanvas.getContext("2d");
        levelImage = new Image();
        levelImage.src = "niveles/" + level + ".png";
        levelImage.onload = function() {
            callBack();
        }
}

function drawLevelCanvas(callBack){
    levelCtx.drawImage(levelImage,0,0);
    callBack();
}

function scanLevelCanvas(callBack){
    pixels = levelCtx.getImageData(0,0,10,11);
    pixelsArray = pixels.data;
    for(var i = 0; i < pixelsArray.length; i += 4){
        if(pixelsArray[i] < 10 && 
        pixelsArray[i + 1] < 10 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es negro
            // casilla donde puede haber un caramelo
            arrayTiles.push(Math.floor( ( i / 4 ) / 10 ) );
            arrayTiles.push(( i / 4 % 10 ));
            spawnCandies( ( Math.floor( ( i / 4 ) / 10 ) ) , ( i / 4 % 10 ) );
            
        }
        if(pixelsArray[i] > 240 && 
        pixelsArray[i + 1] < 10 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es rojo
            // casilla donde hay un bloque que no se puede mover y no puede ser atravesado por los caramelos
        }
        if(pixelsArray[i] < 10 && 
        pixelsArray[i + 1] > 240 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es verde
            // casilla transparente atravesable por caramelos pero no se quedan en ellas
        }
         //document.write(pixelsArray[i]+"-"+pixelsArray[i+1]+"-"+pixelsArray[i+2]+"-"+pixelsArray[i+3]+"<br>");
         //console.log ( "pixel " + i / 4 + ": fila: " + ( Math.floor( ( i / 4 ) / 10 ) ) +", columna: "+ ( i / 4 % 10 ) );
    }
    callBack();
}

function hideLevelCanvas(callBack){
    $(".level").hide();
    caerDirectamente = true;
    callBack();
}
function showLevelCanvas(){
    $(".level").show();
}

function reScanLevelCanvas(){ // esta es la función que hay que cambiar. Es la que hace los push de los caramelos, que me comentaste que no encontrabas dónde se hacía
    for (var i = 0; i < arrayTiles.length; i+=2) { //nota: ya está corregido, ahora funciona con un array
        selectCandy(arrayTiles[i],arrayTiles[i+1]);
        if(selectedCandy == "") {
            candies.push(new Candy(arrayTiles[i], arrayTiles[i+1],Math.ceil(Math.random()*6),candyCount));
            //console.log("candy: " + candyCount);
            candyCount++;
        }
    }
}


//// HUD ////
function drawHUD(){
    ctx.font="50px Comic-Sans";
    ctx.textAlign="center";
    ctx.fillText("Puntos: "+points+"                               Movimientos: "+moves+" ",canvasWidth/2,150);
}

function spawnCandies(row,column){ // funciones auxiliares para ahorrarnos lineas luego
    candies.push(new Candy(row, column, Math.ceil( Math.random() * 6 ), candyCount ) );
    addCandyToDatabase(row, column, candyCount);
    candyCount++;
}

function removeCandies(row,column){ // era para trabajar con database, ignoralo xDD
    removeCandyFromDatabase(row,column);
}

//lógica de detección de grupos////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkCandies(){
    ////////////////////////////////////////animación de eliminar caramelos
    for (var c in candies){
        if(candies[c].remove === true){ // si el caramelo ha sido asignado para ser eliminado
            cannotMove = true;  // impide que haya movimientos
            candies[c].width -= 5;  // disminuye el tamaño de la imagen
            candies[c].height -= 5; //eso
            ////efectos de caramelos especiales
            if(candies[c].type > 10 && candies[c].type < 17) { //especial vertical
                if(!candies[c].specialEfectDone) {
                    selectCandy(candies[c].row, candies[c].column);
                    for (var up in selectedCandyUp) {
                        if(candies[selectedCandyUp[up]] instanceof Candy) {
                            candies[selectedCandyUp[up]].remove = true;
                            points += trio;
                        }
                    }
                    for (var down in selectedCandyDown) {
                        if(candies[selectedCandyDown[down]] instanceof Candy) {
                            candies[selectedCandyDown[down]].remove = true;
                            points += trio;
                        }
                    }
                    candies[c].specialEfectDone = true;
                }
            }
            if(candies[c].type > 20 && candies[c].type < 27) { //especial horizontal
                if(!candies[c].specialEfectDone) {
                    selectCandy(candies[c].row, candies[c].column);
                    for (var left in selectedCandyLeft) {
                        if(candies[selectedCandyLeft[left]] instanceof Candy) {
                            candies[selectedCandyLeft[left]].remove = true;
                            points += trio;
                        }
                    }
                    for (var right in selectedCandyRight) {
                        if(candies[selectedCandyRight[right]] instanceof Candy) {
                            candies[selectedCandyRight[right]].remove = true;
                            points += trio;
                        }
                    }
                    candies[c].specialEfectDone = true;
                }
            }
            if(candies[c].type === 40) { //especial multicolor
                if(!candies[c].specialEfectDone) {
                    for (var cand in candies) {
                        if(candies[cand].type == candies[c].specialColor && candies[cand] != candies[c]) {
                            candies[cand].remove = true;
                            animations.push(new Animation(1,candies[c].x,candies[c].y,candies[cand].x,candies[cand].y));
                            points += trio;
                        }
                    }
                    candies[c].specialEfectDone = true;
                }
            }
            if(candies[c].type > 30 && candies[c].type < 37) { //especial 3x3
                if(!candies[c].specialEfectDone) {
                    selectCandy(candies[c].row, candies[c].column);
                    var adyacentCandies = [];
                    adyacentCandies.push(selectedCandyUp[0]);
                    adyacentCandies.push(selectedCandyDown[0]);
                    adyacentCandies.push(selectedCandyLeft[0]);
                    adyacentCandies.push(selectedCandyRight[0]);
                    adyacentCandies.push(selectedCandy);
                    for (var adya in adyacentCandies) {
                        selectCandy(candies[adyacentCandies[adya]].row, candies[adyacentCandies[adya]].column)
                            for (var up in selectedCandyUp) {
                                if(candies[selectedCandyUp[up]] instanceof Candy) {
                                    candies[selectedCandyUp[up]].remove = true;
                                    points += trio;
                                }
                            }
                            for (var down in selectedCandyDown) {
                                if(candies[selectedCandyDown[down]] instanceof Candy) {
                                    candies[selectedCandyDown[down]].remove = true;
                                    points += trio;
                                }
                            }
                            for (var left in selectedCandyLeft) {
                                if(candies[selectedCandyLeft[left]] instanceof Candy) {
                                    candies[selectedCandyLeft[left]].remove = true;
                                    points += trio;
                                }
                            }
                            for (var right in selectedCandyRight) {
                                if(candies[selectedCandyRight[right]] instanceof Candy) {
                                    candies[selectedCandyRight[right]].remove = true;
                                    points += trio;
                                }
                            }
                    }
                    candies[c].specialEfectDone = true;
                }
            }
            ///eliminación de caramelos tras animación
            if(candies[c].width < 10){  // si el tamaño es menor de 10px
                selectCandy(candies[c].row,candies[c].column); // selecciona al caramelo y sus adyacentes para bajar una posicion a todos los de arriba
                for (var s in selectedCandyUp){
                    if(selectedCandyUp[s] !== ""){
                        if(selectedQuantity == 1){
                            candies[selectedCandyUp[s]].row ++;
                        }
                    }
                }
                candies.splice(c,1); // elimina al caramelo
                firstClick = false; // por si hay combos, que fristclick true sea solo para la primera eliminación
                cannotMove = false; // en el caso de que esta eliminación sea la última, ya te puedes mover, sino volverá a ser true al proximo caramelo que encuentre que se esté eliminando
            }
        }
    }
    //////////////////////////////////////comprobación de nuevos caramelos a eliminar///////////////////////////
    if (!cannotMove) { //si no se está produciendo animación de eliminación de caramelos...
        for (var i = 0; i < candies.length; i++){ // busca L o T
            sameVertical = 1; // variable que se incremente cada vez que hay un adyacente vertical del mismo tipo
            sameHorizontal = 1; // variable que se incremente cada vez que hay un adyacente horizontal del mismo tipo
            removeCandy = false; // las funciones checkdown(), checkup(), checkleft(), checkright() lo utilizan como argumento y si es true hace operaciones adicionales. Por defecto la primera vez se llama a esas funciones con removeCandy=false
            selectCandy(candies[i].row, candies[i].column); // selecciona el caramelo y sus adyacentes
            checkUp(removeCandy); // haz las funciones check con removecandy = false, siendo false, lo que hace es aumentar sameHorizontal y samevertical en caso de encontrar un caramelo igual
            checkDown(removeCandy);
            checkLeft(removeCandy);
            checkRight(removeCandy);
            if(sameVertical >= 3 && sameHorizontal >= 3){ // tenemos una L o T, por lo tanto se volveran a hacer las funciones checkup() y compañía con el argumento removeCandy = true
                //console.log("tenemos L o T en la fila:"+candies[selectedCandy].row+"//columna:"+candies[selectedCandy].column)
                cannotMove = true;
                removeCandy = true;
                points += combEnT;
                candiesToRemove.push(selectedCandy); // el selected candy es seleccionado para ser eliminado this.remove = true, bueno, en verdad meto el índice en la matriz candiestoremove que va a contener los caramelos que van a cambiar su propiedad a this.remove = true
                checkUp(removeCandy,function() {
                    checkDown(removeCandy, function(){
                        checkLeft(removeCandy, function() {
                            checkRight(removeCandy, function() {
                                removeCandy = false; // vuelva a poner remove candy como false para que vuelva a funcionar de la otra forma las funciones check
                                if(candies[selectedCandy].remove === false){
                                    if(firstClick){ // aquí se mete el caramelo especial, lo hace de una manera o de otra en función de si firstclick = true o false
                                        candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[selectedCandy].type + 30,candyCount));
                                        candyCount++;
                                    }else{
                                        candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type + 30,candyCount));
                                        candyCount++;
                                    }
                                }
                                for(var c in candiesToRemove){
                                    candies[candiesToRemove[c]].remove = true; // pues eso, los caramelos anteriormente seleccionados seran etiquetados como this.remove = true y en el siguiente bucle empezarán a empequeñecer
                                }
                                candiesToRemove=[]; // una vez que hayas cambiado la propiedad a true, vacia la matriz para las siguientes comprobaciones
                                return; // en caso de que haya habido una combinación en T o en L, no sigas comprobando en este frame
                            });
                        });
                    });
                }); // si removecandy = true, ahora lo que hace la función es seleccionar a los caramelos que son iguales para ser eliminados (this.remove = true)
            }
        }
        for (var i = 0; i < candies.length; i++){ //busca combinaciones horizontales o verticales en caso de que no haya habido ninguna L o T
            sameVertical = 1; // todo lo de aquí tiene estructura similar a los de L o T
            sameHorizontal = 1;
            removeCandy = false;
            selectCandy(candies[i].row, candies[i].column);
            checkUp(removeCandy);
            checkDown(removeCandy); // haz los check incrementando sameHorizontal y sameVertical
            checkLeft(removeCandy);
            checkRight(removeCandy);
            
            if(sameVertical >= 3){ // tenemos combinacion vertical   
                //console.log("tenemos combinacion vertical");
                cannotMove = true;
                points += trio;
                removeCandy = true;
                candiesToRemove.push(selectedCandy);
                checkUp(removeCandy,function(){
                    checkDown(removeCandy, function(){
                        if(candies[selectedCandy].remove === false){
                            if (firstClick){
                                if (sameVertical === 4){
                                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type + 10,candyCount));
                                    candyCount++;
                                    points += cuarteto;
                                }
                                if (sameVertical === 5){
                                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,40,candyCount));
                                    candyCount++;
                                    points += quinteto;
                                }
                            }else{
                                if (sameVertical === 4){
                                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type + 10,candyCount));
                                    candyCount++;
                                    points += cuarteto;
                                }
                                if (sameVertical === 5){
                                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,40,candyCount));
                                    candyCount++;
                                    points += quinteto;
                                }
                            }
                        }
                        removeCandy = false;
                        for(var c in candiesToRemove){
                            if(candies[candiesToRemove[c]] instanceof Candy) {
                                candies[candiesToRemove[c]].remove = true;
                            }
                        }
                        candiesToRemove=[];
                        return;
                    });
                });
            }
            
            if(sameHorizontal >= 3){ // tenemos combinación horizontal
                //console.log("tenemos combinacion horizontal");
                cannotMove = true;
                points += trio;
                removeCandy = true;
                candiesToRemove.push(selectedCandy);
                checkLeft(removeCandy, function() {
                    checkRight(removeCandy, function() {
                        //console.log("borrame:"+candiesToRemove)
                        if(candies[selectedCandy].remove === false){
                            if(firstClick){
                                if (sameHorizontal === 4){
                                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type + 20,candyCount));
                                    candyCount++;
                                    points += cuarteto;
                                }
                                if (sameHorizontal === 5){
                                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,40,candyCount));
                                    candyCount++;
                                    points += quinteto;
                                }
                            }else{
                                if (sameHorizontal === 4){
                                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type + 20,candyCount));
                                    candyCount++;
                                    points += cuarteto;
                                }
                                if (sameHorizontal === 5){
                                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,40,candyCount));
                                    candyCount++;
                                    points += quinteto;
                                }
                            }
                        }
                        removeCandy = false;
                        for(var c in candiesToRemove){
                            if(candies[candiesToRemove[c]] instanceof Candy){
                                candies[candiesToRemove[c]].remove = true;
                            }
                        }
                        candiesToRemove=[];
                    });
                });
            }
        }
    }
}
//funciones auxiliares para detección de grupos////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkUp(removeCandy,callBack){
    for (var i = 0; i < 10; i++){
        if(selectedCandyUp[i] !== ""){
            if(candies[selectedCandy].type === candies[selectedCandyUp[i]].type ||
            (candies[selectedCandy].type + 10 === candies[selectedCandyUp[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 20 === candies[selectedCandyUp[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 30 === candies[selectedCandyUp[i]].type && candies[selectedCandy].type < 7) ||
            candies[selectedCandyUp[i]].type === 40 ||
            candies[selectedCandyUp[i]].type === 100){       // si los caramelos son del mismo tipo o combinables
                if(removeCandy){ // este if se ejecuta si removecandy == true
                    if(candies[selectedCandyUp[i]].id != candyCount-1) {
                        candiesToRemove.push(selectedCandyUp[i]);// esto se ejecuta si removecandy == false
                        if(candies[selectedCandyUp[i]].type === 40) {
                            candies[selectedCandyUp[i]].specialColor = candies[selectedCandy].type;
                        }
                    }
                }else{sameVertical++;}  
            }else{ 
                if(typeof callBack === "function") {
                    callBack();
                }
                return
                
            } // al primer caramelo que no sea igual que el primero, deja de comparar
        }else{
            if(typeof callBack === "function") {
                callBack();
            }
            return
        } // al primer caramelo que intente comparar que no exista, deja de comparar
    }
    
}
function checkDown(removeCandy,callBack){ // lo mismo que checkup pero para abajo
    for (var i = 0; i < 10; i++){
        if(selectedCandyDown[i] !== ""){
            if(candies[selectedCandy].type === candies[selectedCandyDown[i]].type || 
            (candies[selectedCandy].type + 10 === candies[selectedCandyDown[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 20 === candies[selectedCandyDown[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 30 === candies[selectedCandyDown[i]].type && candies[selectedCandy].type < 7) ||
            candies[selectedCandyDown[i]].type === 40 ||
            candies[selectedCandyDown[i]].type === 100){       
                if(removeCandy){
                    if(candies[selectedCandyDown[i]].id != candyCount-1) {
                        candiesToRemove.push(selectedCandyDown[i]);
                        if(candies[selectedCandyDown[i]].type === 40) {
                            candies[selectedCandyDown[i]].specialColor = candies[selectedCandy].type;
                        }
                    }
                }else{sameVertical++;}
            }else{
                if(typeof callBack === "function") {
                    callBack();
                }
                return
            }
        }else{
            if(typeof callBack === "function") {
                callBack();
            }
            return
        }
    }
}
function checkLeft(removeCandy,callBack){// lo mismo que checkup pero para left
    for (var i = 0; i < 10; i++){
        if(selectedCandyLeft[i] !== ""){
            if(candies[selectedCandy].type === candies[selectedCandyLeft[i]].type || 
            (candies[selectedCandy].type + 10 === candies[selectedCandyLeft[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 20 === candies[selectedCandyLeft[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 30 === candies[selectedCandyLeft[i]].type && candies[selectedCandy].type < 7) ||
            candies[selectedCandyLeft[i]].type === 40 ||
            candies[selectedCandyLeft[i]].type === 100){
                if(removeCandy){
                    if(candies[selectedCandyLeft[i]].id != candyCount-1) {
                        candiesToRemove.push(selectedCandyLeft[i]);
                        if(candies[selectedCandyLeft[i]].type === 40) {
                            candies[selectedCandyLeft[i]].specialColor = candies[selectedCandy].type;
                        }
                    }
                }else{sameHorizontal++;}
            }else{
                if(typeof callBack === "function") {
                    callBack();
                }
                return
                
            }
        }else{
            if(typeof callBack === "function") {
                callBack();
            }
            return
        }
    }
}
function checkRight(removeCandy,callBack){// lo mismo que checkup pero para right
    for (var i = 0; i < 10; i++){
        if(selectedCandyRight[i] !== ""){
            if(candies[selectedCandy].type === candies[selectedCandyRight[i]].type ||
            (candies[selectedCandy].type + 10 === candies[selectedCandyRight[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 20 === candies[selectedCandyRight[i]].type && candies[selectedCandy].type < 7) ||
            (candies[selectedCandy].type + 30 === candies[selectedCandyRight[i]].type && candies[selectedCandy].type < 7) ||
            candies[selectedCandyRight[i]].type === 40 ||
            candies[selectedCandyRight[i]].type === 100){
                if(removeCandy){
                    if(candies[selectedCandyRight[i]].id != candyCount-1){
                        candiesToRemove.push(selectedCandyRight[i]);
                        if(candies[selectedCandyRight[i]].type === 40) {
                            candies[selectedCandyRight[i]].specialColor = candies[selectedCandy].type;
                        }
                    }
                }else{sameHorizontal++;}
            }else{
                if(typeof callBack === "function") {
                    callBack();
                }
                return
            }
        }else{
            if(typeof callBack === "function") {
                callBack();
            }
            return
        }
    }
}

function selectCandy(selectedRow,selectedColumn){
    selectedCandy = "";
    selectedQuantity = 0;
    selectedCandyUp =       ["","","","","","","","","",""];
    selectedCandyDown =     ["","","","","","","","","",""];
    selectedCandyLeft =     ["","","","","","","","","",""];
    selectedCandyRight =    ["","","","","","","","","",""];
    for (var c in candies){
        if(candies[c].row == selectedRow){
            if (candies[c].column == selectedColumn){ // caramelo seleccionado
                selectedCandy = c;
                selectedQuantity++;
            }
            for (var i=0; i<10; i++){
                if (candies[c].column == selectedColumn-(i+1)) { // caramelo seleccionado izquierda
                    selectedCandyLeft[i] = c;
                }
                if(candies[c].column == selectedColumn + (i+1)){ // caramelo seleccionado derecha
                    selectedCandyRight[i] = c;
                } 
            }
        }
        if(candies[c].column == selectedColumn){ 
            for (var i = 0; i < 10; i++){
                if(candies[c].row == selectedRow-(i+1)){ //caramelos seleccionados arriba
                    selectedCandyUp[i] = c;
                }
                if(candies[c].row == selectedRow+(i+1)){ //caramelos seleccionados abajo
                    selectedCandyDown[i] = c;
                } 
            }
            for(var i = 0; i<10;i++){ // lo he cambiado de i = 4 a i = 0
                if(candies[c].row == selectedRow-(i+1)){ //caramelos seleccionados arriba
                    selectedCandyUp[i] = c;
                }
            }
        }  
    }
           
    /*console.log("selectedCandy = "+selectedCandy );
    console.log("selectedCandyUp = " + selectedCandyUp);
    console.log("selectedCandyDown = "+ selectedCandyDown);
    console.log("selectedCandyLeft = "+ selectedCandyLeft );
    console.log("selectedCandyRight = "+selectedCandyRight); */
}



 /* candiesToRemove */ 

 function nextLevel(){
    if(points>500){
        points = 0;
        moves = 50;
        level++;
        cannotMove = false;
        caerDirectamente = true;
        
        candies.splice(0,candies.length);
        arrayTiles.splice(0,arrayTiles.length);

        prepareLevelCanvas(level,function(){ // esto está hecho así para que las funciones se ejecuten cuando terminen de ejecutarse la anterior sin tener que hacer un timeout
            drawLevelCanvas(function(){
                scanLevelCanvas(function(){
                    hideLevelCanvas(function(){
                        alert("Has pasado de nivel");
                    });
                });
            });
        });
    }
 }