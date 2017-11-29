function Map(){
    this.cellSize = 40;
    
    
    this.props = [];
    // carga de imágenes para los props.
    this.propsImg = [];
    for(var i = 0;i<=13;i++){
        this.propsImg[i] = new Image();
        this.propsImg[i].src = "img/props/"+i+".png";
    }
    
    
    // Carga de imágenes de disparo.
    this.shotImg = [];
    for(var i = 0;i<= 1; i++){
        this.shotImg[i] = new Image();
        this.shotImg[i].src = "img/shots/"+i+".png";
    }
    
    //////////////////
    this.enemys = [];
    
    this.enemyImg = [];
    
    this.enemyImg [0+"left"] = new Image();
    this.enemyImg [0+"left"].src ="img/enemy/albondiga/left.png"
    this.enemyImg [0+"right"] = new Image();
    this.enemyImg [0+"right"].src ="img/enemy/albondiga/right.png"
    this.enemyImg [0+"up"] = new Image();
    this.enemyImg [0+"up"].src ="img/enemy/albondiga/up.png"
    this.enemyImg [0+"down"] = new Image();
    this.enemyImg [0+"down"].src ="img/enemy/albondiga/down.png"
    this.enemyImg [0] = new Image();
    this.enemyImg [0].src ="img/enemy/albondiga/dead.png"

    
  /*  for(var i = 0; i< <= 7){
        this.enemyImg[1] = new Image();
        this.enemyImg[1].src ="";  
    }
*/
    this.newEnemy = function(posx,posy,type,roomID){
        game.map.enemys.push(new Enemy(posx,posy,type,roomID))
    }
    
    this.tick = function(){

        
        for(var e in this.enemys){
            this.enemys[e].tick();
        }
        
        for(var x in this.props){
            this.props[x].tick();
        }
    }
}

