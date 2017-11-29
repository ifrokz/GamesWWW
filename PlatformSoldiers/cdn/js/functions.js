 ////////////////////////////////////
 //          canvasResize          //
 ////////////////////////////////////

 function canvasResize(){
     $("#lienzo").attr("height", windowHeight);
     $("#lienzo").attr("width", windowWidth);
 }


 ////////////////////////////////////
 //         Player Move            //
 ////////////////////////////////////

 $(document).keydown(function(event){
     if(event.which == 39 || event.which == 68){player.dir = "right";}
     if(event.which == 37 || event.which == 65){player.dir = "left";}
     if(event.which == 32){
         if(player.jump){
             player.speedY = -windowHeight/40;
             player.jump = false;
        }
     }
 });


  $(document).keyup(function(event){
     if((event.which == 39 || event.which == 68) && player.dir == "right"){player.dir = "";}
     if((event.which == 37 || event.which == 65) && player.dir == "left"){player.dir = "";}
     if(event.which == 32){
         // SPACE
     }
 });

 ////////////////////////////////////
 //         Collisions             //
 ////////////////////////////////////

 function collideManager(){
     playerBlock();
 }

 function playerBlock(){
     for(var b in block){
         if(Math.abs((player.posX+player.width/2)-(block[b].posX+block[b].width/2)) < player.width/2+block[b].width/2){
            if(Math.abs((player.posY+player.height/2)-(block[b].posY+block[b].height/2)) < player.height/2+block[b].height/2){
                
                if(block[b].type == 5){ // SUELO
                    player.speedY = 0;
                    player.posY = block[b].posY-player.height;
                    player.jump = true;
                }else if(block[b].type == 4){ // BLOQUES REGALO
                    block.splice(b, 1);
                    break;
                }
            }
         }
     }
 }