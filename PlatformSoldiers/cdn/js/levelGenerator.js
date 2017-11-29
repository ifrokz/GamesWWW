 ////////////////////////////////////
 //       Level Generator          //
 ////////////////////////////////////

function newLevel(){
    if(nextLevel){
        if(level<=levelMax){
            nextLevel = false;
            setTimeout(function(){
                level++;

                console.log(level); 
                $("#cont").append("<canvas id='level' height='"+levelImg[level].height+"px' width='"+levelImg[level].width+"px' ></canvas>");
                var levelCanvas = document.getElementById("level");
                levelCtx = levelCanvas.getContext("2d");
                
                levelCtx.drawImage(levelImg[level],0,0);

                scan = levelCtx.getImageData(0,0,levelImg[level].width,levelImg[level].height);
                datos = scan.data;

                // Recorro cada uno de los píxeles.
                for( var i = datos.length ; i>= 0 ; i-=4 ){
                    
                    if(datos[i] == 255 && datos[i+1] == 255 && datos[i+2] == 255){

                    }else if(datos[i] == 255 && datos[i+1] == 0 && datos[i+2] == 0){
                        console.log("Red");
                        player.posX = (i/4)%levelImg[level].width*player.width;
                        player.posY = (i/4)/levelImg[level].width*player.height;
                    }else if(datos[i] == 0 && datos[i+1] == 0 && datos[i+2] == 255){
                        console.log("Blue");
                    }else if(datos[i] == 255 && datos[i+1] == 255 && datos[i+2] == 0){
                        console.log("Yellow");
                        block.push(new cBlock( (i/4)%levelImg[level].width , Math.floor((i/4)/levelImg[level].width) , 4 ));
                    }else if(datos[i] == 150 && datos[i+1] == 50 && datos[i+2] == 0){
                        console.log("Brown");
                        block.push(new cBlock( (i/4)%levelImg[level].width , Math.floor((i/4)/levelImg[level].width) , 5 ));
                    }else if(datos[i] == 0 && datos[i+1] == 200 && datos[i+2] == 0){
                        console.log("Green Down");
                        block.push(new cBlock( (i/4)%levelImg[level].width , Math.floor((i/4)/levelImg[level].width) , 6 ));
                    }else if(datos[i] == 0 && datos[i+1] == 255 && datos[i+2] == 0){
                        console.log("Green Up");
                        block.push(new cBlock( (i/4)%levelImg[level].width , Math.floor((i/4)/levelImg[level].width) , 7 ));
                    }
                }  
                console.log(block);
                // Eliminamos el canvas del nuevo nivel
                $("#cont").html("");
            },500);
        }
  
    }
}