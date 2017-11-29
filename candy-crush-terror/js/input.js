function clickCandies(){ 
    $("#canvas").on('mousedown', function(event){ 
        if(!cannotMove){ //cannotMove es para impedir movimientos mientras hay caramelos eliminandose
            firstClick = true; // los caramelos especiales aparecen donde has hecho click, pero si la partida aun no ha empezado (como no has hecho click) el caramelo especial aparecería en la fila 1-1. Además si hay un combo, y la combinacion >3 aparece después de la primera, tampoco debe aparecer donde has hecho click
            //console.log("pageX:"+event.pageX + " | pageY:" + event.pageY);
            if(event.pageX/factorEscalado > 40 && event.pageX/factorEscalado < 1040 && event.pageY/factorEscalado > 10 + 3 * 100 && event.pageY/factorEscalado < 1910 - 5 * 100){
                //console.log("fila:" + (Math.floor( ( event.pageY - 10 ) / 100 ) - 3)+"//columna:"+ Math.floor( ( event.pageX - 40 ) / 100));
                var tempRow = (Math.floor( ( event.pageY/factorEscalado - 10 ) / 100 ) - 3); //fila donde has hecho click
                var tempColumn =(Math.floor( ( event.pageX/factorEscalado - 40 ) / 100));   //columna donde has hecho click
                for (var c in candies){ //todo este bucle for es para seleccionar los índices de los caramelos adyacentes al que has hecho click
                    if(candies[c].row == tempRow){
                        if (candies[c].column == tempColumn){ // caramelo seleccionado
                            clickCandy = c;
                        }
                        if (candies[c].column == tempColumn - 1) { // caramelo seleccionado izquierda
                            clickCandyLeft = c;
                        }
                        if(candies[c].column == tempColumn + 1){ // caramelo seleccionado derecha
                            clickCandyRight = c;
                        } 
                    }
                    if(candies[c].column == tempColumn){ 
                        if(candies[c].row == tempRow-1){ //caramelos seleccionados arriba
                            clickCandyUp = c;
                        }
                        if(candies[c].row == tempRow+1){ //caramelos seleccionados abajo
                            clickCandyDown = c;
                        } 
                    }  
                }
                //candies.push( new Candy(Math.floor( ( event.pageY - 10 ) / 100 ) - 3, Math.floor( ( event.pageX - 40 ) / 100), Math.ceil( Math.random() * 8 ) , candyCount ) );
                //addCandyToDatabase(candies[candies.length-1].row,candies[candies.length-1].column,candyCount);
                //candyCount++;
                /*/ para debug/////////////////////////////////////////////////////////////////////////
                for (var c in candies){                                                             //
                    var tempSelectedRow = Math.floor( ( event.pageY/factorEscalado - 10 ) / 100 ) - 3;             //
                    var tempSelectedColumn = Math.floor( ( event.pageX/factorEscalado - 40 ) / 100 );              //
                    if(candies[c].row == tempSelectedRow){                                          //
                        if (candies[c].column == tempSelectedColumn){ // caramelo seleccionado      //
                            selectedCandy = c;                                                      // 
                            console.log(candies[selectedCandy].type)                                //
                        }                                                                           //
                    }                                                                               //
                }                                                                                   //      
                /*/////////////////////////////////////////////////////////////////////////////////////
            }
        }
    });
  
    $("#canvas").on('touchstart',function(e){ 
       //console.log("has hecho tap en: " +e.originalEvent.touches[0].pageX+","+e.originalEvent.touches[0].pageY)
        if(!cannotMove){ //cannotMove es para impedir movimientos mientras hay caramelos eliminandose
            firstClick = true; // los caramelos especiales aparecen donde has hecho click, pero si la partida aun no ha empezado (como no has hecho click) el caramelo especial aparecería en la fila 1-1. Además si hay un combo, y la combinacion >3 aparece después de la primera, tampoco debe aparecer donde has hecho click
            //console.log("pageX:"+event.pageX + " | pageY:" + event.pageY);
            if(e.originalEvent.touches[0].pageX/factorEscalado > 40 && e.originalEvent.touches[0].pageX/factorEscalado < 1040 && e.originalEvent.touches[0].pageY/factorEscalado > 10 + 3 * 100 && e.originalEvent.touches[0].pageY/factorEscalado < 1910 - 5 * 100){
                //console.log("fila:" + (Math.floor( ( event.pageY - 10 ) / 100 ) - 3)+"//columna:"+ Math.floor( ( event.pageX - 40 ) / 100));
                var tempRow = (Math.floor( ( e.originalEvent.touches[0].pageY/factorEscalado - 10 ) / 100 ) - 3); //fila donde has hecho click
                var tempColumn =(Math.floor( ( e.originalEvent.touches[0].pageX/factorEscalado - 40 ) / 100));   //columna donde has hecho click
                for (var c in candies){ //todo este bucle for es para seleccionar los índices de los caramelos adyacentes al que has hecho click
                    if(candies[c].row == tempRow){
                        if (candies[c].column == tempColumn){ // caramelo seleccionado
                            clickCandy = c;
                        }
                        if (candies[c].column == tempColumn-1) { // caramelo seleccionado izquierda
                            clickCandyLeft = c;
                        }
                        if(candies[c].column == tempColumn + 1){ // caramelo seleccionado derecha
                            clickCandyRight = c;
                        } 
                    }
                    if(candies[c].column == tempColumn){ 
                        if(candies[c].row == tempRow-1){ //caramelos seleccionados arriba
                            clickCandyUp = c;
                        }
                        if(candies[c].row == tempRow+1){ //caramelos seleccionados abajo
                            clickCandyDown = c;
                        } 
                    }  
                }
            }
        }
    });

    $("#canvas").swipe( {
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            //console.log(direction);
            if(!cannotMove){ // solo puedes hacer swipe mientras no haya animación de eliminación de caramelos
                switch(direction){
                    case "left":
                    //console.log("left")
                        if(clickCandyLeft === ""){}else{
                            candies[clickCandy].column -= 1;
                            candies[clickCandyLeft].column += 1;
                        }

                        break;
                    case "right":
                        if(clickCandyRight === ""){}else{
                            candies[clickCandy].column += 1;
                            candies[clickCandyRight].column -= 1;
                        }

                        break;
                    case "up":
                        if(clickCandyUp === ""){}else{
                            candies[clickCandy].row -= 1;
                            candies[clickCandyUp].row += 1;
                        }
                        break;
                    case "down":
                        if(clickCandyDown === ""){}else{
                            candies[clickCandy].row += 1;
                            candies[clickCandyDown].row -= 1;
                        }
                        break;
                }
                clickCandyUp = ""; // resetea los valores de los índices del caramelo donde has hecho click y sus adyacentes
                clickCandyDown = "";
                clickCandyLeft = "";
                clickCandyRight = "";
                //console.log(selectedCandyLeft)
                moves--;
            }
        },
        threshold:0
    });
}