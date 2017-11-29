function d2r(angulo){
    return(angulo*0.017453293);
}

function keyInput(){
    $(document).keydown(function(event){
        /*if(event.which == 37){cursorX-=gridSize/2;}                                //muevo elemento
        if(event.which == 38){cursorY-=gridSize/2;}
        if(event.which == 39){cursorX+=gridSize/2;}
        if(event.which == 40){cursorY+=gridSize/2;}*/
        if(event.which == 32){
            editType = !editType;
        }
        //camara
        if(event.which == 100 || event.which == 65){gapX+=gridSize;}
        if(event.which == 104 || event.which == 87){gapY+=gridSize/2;}
        if(event.which == 102 || event.which == 68){gapX-=gridSize;}
        if(event.which == 98 || event.which == 83){gapY-=gridSize/2;}                                //muevo camara
    });
    $(document).click(function(event){
        if(tileAccept){
            //console.log(event.pageX +" | "+event.pageY);
            clicCartX = (2 * (event.pageY - gapY) + (event.pageX - gapX)) / 2 ;     //proyecto el clic en isometrico a cartesianas
            clicCartY = (2 * (event.pageY - gapY) - (event.pageX - gapX)) / 2 ;
            squareX = Math.floor((clicCartX - gridSize/4)/(gridSize/2));            //veo en que cuadrado he hecho clic
            squareY = Math.floor((clicCartY - gridSize/4)/(gridSize/2));
            /*cursorX = (squareX+1) * gridSize / 2;                                      //coloco el elemento en ese cuadro
            cursorY = (squareY+1) * gridSize / 2;*/
            //console.log(squareX +" | "+ squareY);
            if(editType){
                tree.push(new cTree(cursorX,cursorY)); 
            }else{
                build.push(new cBuild(cursorX,cursorY));
            }

            build.sort(function (a, b) {
			  return  a.fila - b.fila || a.columna - b.columna;
			});
            //console.log(cursorX+"////"+cursorY);
        }
    });
    
    $(document).mousemove(function(event){
        tileAccept = true;  
        moveCartX = (2 * (event.clientY - gapY) + (event.clientX - gapX)) / 2 ;     //proyecto el clic en isometrico a cartesianas
        moveCartY = (2 * (event.clientY - gapY) - (event.clientX - gapX)) / 2 ;
        moveSquareX = Math.floor((moveCartX - gridSize/4)/(gridSize/2));            //veo en que cuadrado he hecho clic
        moveSquareY = Math.floor((moveCartY - gridSize/4)/(gridSize/2));
        //console.log(moveSquareX+"////"+moveSquareY);
        cursorX = (moveSquareX+1) * gridSize / 2;                                      //coloco el elemento en ese cuadro
        cursorY = (moveSquareY+1) * gridSize / 2;
        var tempFila = cursorY/(gridSize/2);
        var tempColumna =cursorX/(gridSize/2);
       // console.log(tempColumna+"/-/"+tempFila);
        for(var t in tree){
            if(tree[t].fila == tempFila && tree[t].columna == tempColumna){
                console.log("ocupado");
                tileAccept = false;
            }
        }
        for(var b in build){
            if(build[b].fila == tempFila && build[b].columna == tempColumna){
                console.log("ocupado");
                tileAccept = false;
            }
        }
        if(tempFila < 0 || tempFila > tileLineNumber-1 || tempColumna < 0 || tempColumna > tileLineNumber-1){
            tileAccept = false;
        }
    });
}
/*
    cursorPX= cursorX - cursorY + gapX;                                                      // proyecta x en ejes isometricos
    cursorPY= (cursorX+cursorY)/2 +gapY;     

*/


function drawManager(){ 
    // TILES DRAW
    for(var t in tile){
        tile[t].draw();
    }  
    
    // Pinto el cuadrante del cursor
    if(tileAccept){
        ctx.drawImage(cursor1,cursorPX-cursor1.width/2,cursorPY-cursor1.height+gridSize/4);
    }else{
        ctx.drawImage(cursor2,cursorPX-cursor1.width/2,cursorPY-cursor1.height+gridSize/4);
    }  
    
        // TREE DRAW 
    for(var t in tree){
        tree[t].draw();
    }     
    for(var b in build){
        build[b].draw();
    }
                                                   
}