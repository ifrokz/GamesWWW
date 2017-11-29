/* /////////////////// /*
    Author: FroKz
    Date: 27/03/17
/* /////////////////// */  


function Meteor(){
    this.mesh = null;
    this.posX = Math.random() < 0.5 ? Math.random()*1000-500 : -(Math.random()*1000-500);  // de -500 a 500
    this.posY = Math.random() < 0.5 ? Math.random()*1000-500 : -(Math.random()*1000-500); 
    this.posZ = Math.random() < 0.5 ? Math.random()*1000-500 : -(Math.random()*1000-500);
    
    this.speedX = Math.random()*10-5;
    this.speedY = Math.random()*10-5;
    this.speedZ = Math.random()*10-5;
    
    
    this.moveX = Math.random() < 0.5 ? false : true;
    this.moveY = Math.random() < 0.5 ? false : true;
    this.moveZ = Math.random() < 0.5 ? false : true;
    
    this.move = function(){
       /* this.mesh.position.x += this.speedX;

        if(this.getPos().z <100 && this.getPos().z > -100 ){
            if(this.getPos().y < 100 & this.getPos().y > -100){
                if(Math.random() < 0.5){
                    this.getPos().y < 0 ? this.mesh.position.y = -100 : this.mesh.position.y = 100;
                }else{
                    this.getPos().z < 0 ? this.mesh.position.z = -100 : this.mesh.position.z = 100;
                }
            }
        }
        
        if(this.getPos().x > 500 || this.getPos().x < -500){
            this.mesh.position.x = Math.random()*1000-500;
        }*/
        this.mesh.position.x += this.speedX;
        this.mesh.position.y += this.speedY;
        
        var getpos = this.getPos();
        if(getpos.z < 75 && getpos.z > -75){
            this.mesh.position.z = Math.random()*1000-500;
        }   

        if(getpos.x > 500 || getpos.x < -500){
            if(getpos.y > 500 || getpos.y < -500){
                this.mesh.position.x = Math.random()*1000-500;
                this.mesh.position.y = Math.random()*1000-500;
            }
        }
    }
    
    this.getPos = function(){
        return{
            x:this.mesh.position.x,
            y:this.mesh.position.y,
            z:this.mesh.position.z
        }
    }
}