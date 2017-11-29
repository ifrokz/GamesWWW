function Game(){
    this.fps = 60;
    this.temp = "";
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.windowWidth = 1920;
    this.windowHeight = 1080;
    this.zoom = 1;
    
    this.gapX = null;
    this.gapY = null;
    
    this.setGapX = function(x){
        this.gapX = x;
    }
    this.setGapY = function(y){
        this.gapY = y;
    }
    
    // LLAMAMOS A LAS CLASES
    this.ajax = new Ajax();
    this.player = new Player();
    this.map = new Map();
    this.hud = new Hud();
    this.object = new Array();
    this.room = new Array();
    this.door = new Array();
    //this.room[0] = new Room(0,2);
    //this.level = new Level();
    
    this.level = function(){
        this.room[0] = new Room(0, Math.floor(Math.random()*3), 0);
        
        for(var i=1;i<4;i++){
            this.room[i] = new Room(0, Math.floor(Math.random()*3), i);
        }
        this.room[4] = new Room(0, 3, 4);
    }
    this.level();
    
    this.createEnemies = function(){
        this.map.newEnemy(500, 500, 0, 0);
        this.map.newEnemy(700, 800, 0, 0);
        this.map.newEnemy(1200, 500, 0, 0);
        this.map.newEnemy(1400, 800, 0, 0);
    }
    
    this.createDoors = function(){
        this.door[0] = new Door(140, 420, 0, 0, 6);
        this.door[1] = new Door(1633, 420, 0, 0, 2);
        this.door[2] = new Door(860, 8, 0, 0, 0);
        this.door[3] = new Door(860, 880, 0, 0, 4);
    }
    
    // ADAPTAR EL CANVAS A LA PANTALLA
    this.resizeCanvas = function(){

        $("#canvas").css("width", this.windowWidth+"px");
        $("#canvas").css("height", this.windowHeight+"px");
        $("#canvas").attr("width", this.windowWidth);
        $("#canvas").attr("height", this.windowHeight);
        
        
    }.bind(this);

    $(document).click(function(e){
        console.log((e.pageX+Math.abs(game.gapX))+","+(e.pageY+Math.abs(game.gapY)));
    });
    // CARGAMOS LOS START DE CADA CLASE
    this.start = function(){
        game.resizeCanvas();
        
        // START FUNCTIONS 
        game.player.start();
        this.createDoors();
        this.createEnemies();
        game.room[game.player.roomID].createObjects();
        
        //game loop
        game.loop();
    }.bind(this);


    // LOOP PRINCIPAL DEL JUEGO - SE LLAMA A LAS FUNCIONES TICK DE LOS OBJETOS.
    this.loop = function(){
        //INICIO DEL BUCLE
        var date = new Date();
        var msStart = date.getTime();
        game.ctx.scale(2,2);
        /// * * * * ///
        this.resizeCanvas();
        
        // TICK
        game.room[game.player.roomID].tick();
        
        for(var i=0;i<this.door.length;i++){
             this.door[i].printDoors();
        }
        
        for(var i=0;i<game.room[game.player.roomID].roomObjCount;i++){
            game.object[i].tick();
        }
        game.map.tick();
        game.player.tick();
        
        
        
        
        
        /// * * * * ///
        
        // TIMER DEL BUCLE
        //console.log(date.getSeconds());
        var msEnd = date.getTime();
        var msDif = msEnd - msStart;
        clearTimeout(this.temp);
        this.temp = setTimeout(game.loop, 1000/this.fps-msDif);
    }.bind(this);
}

// CREACIÓN DEL JUEGO UNA VEZ EL DOCUMENTO ESTÁ CARGADO
var game;
$(document).ready(function(){
    loginUtils();
    game = new Game();
});





Game.prototype.newProp = function(posx,posy,type){
    game.map.props.push(new Prop(posx,posy,type));
}