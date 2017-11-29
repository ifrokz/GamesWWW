function Room(type, attr, id){
    this.type = type;
    this.attr = attr;
    this.roomImg = new Array();
    this.roomWidth = new Array();
    this.roomHeight = new Array();
    this.roomCount = 4;
    this.roomObjCount = 0;
    this.enemies = 4;

    // Get all images
    for(var i=0;i<this.roomCount;i++){
        this.roomImg[i] = new Image();
        this.roomImg[i].src = "img/rooms/"+i+".png";
        this.roomWidth[i] = this.roomImg[i].width;
        this.roomHeight[i] = this.roomImg[i].height;
    }
    this.objectCount = 31;
    this.objectImg = new Array();
    for(var i=0;i<this.objectCount;i++){
        this.objectImg[i] = new Image();
        this.objectImg[i].src = "img/objects/"+i+".png";
    }
    
    this.printRoom = function(){
        game.ctx.drawImage(this.roomImg[this.type], 0+game.gapX, 0+game.gapY);
    }
    
    this.printDoors = function(){
        // En función del algoritmo se pondrán unas puertas u otras
        
    }
    
    this.printObjects = function(){
        if(this.type == 0){
            if(this.attr == 0){
                // Decoration
                game.ctx.drawImage(this.objectImg[12], 1150+game.gapX, 20+game.gapY);
                game.ctx.drawImage(this.objectImg[16], 450+game.gapX, 20+game.gapY);
                game.ctx.drawImage(this.objectImg[23], 100+game.gapX, 640+game.gapY);
                // Count = 10
                this.roomObjCount = 10;
            }else if(this.attr == 1){
                // Decoration
                game.ctx.drawImage(this.objectImg[19], 110+game.gapX, 660+game.gapY);
                game.ctx.drawImage(this.objectImg[25], 1700+game.gapX, 210+game.gapY);
                game.ctx.drawImage(this.objectImg[14], 300+game.gapX, 920+game.gapY);
                game.ctx.drawImage(this.objectImg[14], 1150+game.gapX, 920+game.gapY);
                // Count = 17
                this.roomObjCount = 17;
            }else if(this.attr == 2){
                // Decoration
                game.ctx.drawImage(this.objectImg[24], 450+game.gapX, 20+game.gapY);
                game.ctx.drawImage(this.objectImg[12], 1100+game.gapX, 26+game.gapY);
                game.ctx.drawImage(this.objectImg[18], 1250+game.gapX, 920+game.gapY);
                // Count = 12
                this.roomObjCount = 12;
            }else{
                // Decoration
                game.ctx.drawImage(this.objectImg[12], 320+game.gapX, 26+game.gapY);
                game.ctx.drawImage(this.objectImg[12], 1100+game.gapX, 26+game.gapY);
                game.ctx.drawImage(this.objectImg[14], 320+game.gapX, 920+game.gapY);
                game.ctx.drawImage(this.objectImg[14], 1150+game.gapX, 920+game.gapY);
                game.ctx.drawImage(this.objectImg[23], 110+game.gapX, 200+game.gapY);
                // Count = 0
                this.roomObjCount = 0;
            }
        }else if(this.type == 1){
            if(this.attr == 0){
                
            }else if(this.attr == 1){
                
            }else if(this.attr == 2){
                
            }else{
                
            }
        }else if(this.type == 2){
            if(this.attr == 0){
                
            }else if(this.attr == 1){
                
            }else if(this.attr == 2){
                
            }else{
                
            }
        }else{
            if(this.attr == 0){
                
            }else if(this.attr == 1){
                
            }else if(this.attr == 2){
                
            }else{
                
            }
        }
    }
    
    this.createObjects = function(){
        // Create objects
        if(this.type == 0){
            if(this.attr == 0){
                game.object[0] = new Object(306+game.gapX, 250+game.gapY, 123, 135, 0);
                game.object[1] = new Object(306+123+game.gapX, 250+game.gapY, 123, 135, 0);
                game.object[2] = new Object(306+123*2+game.gapX, 250+game.gapY, 123, 135, 0);
                game.object[3] = new Object(306+game.gapX, 650+game.gapY, 123, 135, 0);
                game.object[4] = new Object(306+123+game.gapX, 650+game.gapY, 123, 135, 0);
                game.object[5] = new Object(306+123*2+game.gapX, 650+game.gapY, 123, 135, 0);
                game.object[6] = new Object(1120+game.gapX, 440-65+game.gapY, 123, 135, 0);
                game.object[7] = new Object(1120+game.gapX, 440+game.gapY, 123, 135, 0);
                game.object[8] = new Object(1120+game.gapX, 440+65+game.gapY, 123, 135, 0);
                game.object[9] = new Object(1530+game.gapX, 110+game.gapY, 123, 135, 2);
            }else if(this.attr == 1){
                game.object[0] = new Object(630+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[1] = new Object(630+123+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[2] = new Object(630+123*3+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[3] = new Object(630+123*4+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[4] = new Object(630+game.gapX, 270+65+game.gapY, 123, 135, 0);
                game.object[5] = new Object(630+game.gapX, 270+65*2+game.gapY, 123, 135, 0);
                game.object[6] = new Object(630+game.gapX, 270+65*3+game.gapY, 123, 135, 0);
                game.object[7] = new Object(630+game.gapX, 270+65*4+game.gapY, 123, 135, 0);
                game.object[8] = new Object(630+123*4+game.gapX, 270+65+game.gapY, 123, 135, 0);
                game.object[9] = new Object(630+123*4+game.gapX, 270+65*2+game.gapY, 123, 135, 0);
                game.object[10] = new Object(630+123*4+game.gapX, 270+65*3+game.gapY, 123, 135, 0);
                game.object[11] = new Object(630+123*4+game.gapX, 270+65*4+game.gapY, 123, 135, 0);
                game.object[12] = new Object(630+game.gapX, 270+65*5+game.gapY, 123, 135, 0);
                game.object[13] = new Object(630+123+game.gapX, 270+65*5+game.gapY, 123, 135, 0);
                game.object[14] = new Object(630+123*2+game.gapX, 270+65*5+game.gapY, 123, 135, 0);
                game.object[15] = new Object(630+123*3+game.gapX, 270+65*5+game.gapY, 123, 135, 0);
                game.object[16] = new Object(630+123*4+game.gapX, 270+65*5+game.gapY, 123, 135, 0);
            }else if(this.attr == 2){
                game.object[0] = new Object(500+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[1] = new Object(500+game.gapX, 270+180+game.gapY, 123, 135, 0);
                game.object[2] = new Object(500+game.gapX, 270+180*2+game.gapY, 123, 135, 0);
                game.object[3] = new Object(500+123*2+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[4] = new Object(500+123*2+game.gapX, 270+180+game.gapY, 123, 135, 0);
                game.object[5] = new Object(500+123*2+game.gapX, 270+180*2+game.gapY, 123, 135, 0);
                game.object[6] = new Object(500+123*4+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[7] = new Object(500+123*4+game.gapX, 270+180+game.gapY, 123, 135, 0);
                game.object[8] = new Object(500+123*4+game.gapX, 270+180*2+game.gapY, 123, 135, 0);
                game.object[9] = new Object(500+123*6+game.gapX, 270+game.gapY, 123, 135, 0);
                game.object[10] = new Object(500+123*6+game.gapX, 270+180+game.gapY, 123, 135, 0);
                game.object[11] = new Object(500+123*6+game.gapX, 270+180*2+game.gapY, 123, 135, 0);
            }else{
                // Sala jefe
            }
        }
    }
    
    this.data = function(){
        return {
            gapX: game.gapX,
            gapY: game.gapY,
            type: this.type,
            width: this.roomImg[this.type].width,
            height: this.roomImg[this.type].height,
            id: this.id
        }
    }

    this.tick = function(){
        this.printRoom();
        //this.printDoors();
        this.printObjects();
    }
}