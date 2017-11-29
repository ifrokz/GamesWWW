cHUD = function(posX, posY){
    this.posX = posX;
    this.posY = posY;

    this.createHUD = function(value, name, text){
        $("#"+name).css("display", "block");
        $("#"+name).html(text+value);
    }
}

var lifeHUD = new cHUD((windowWidth - (windowWidth - 50)), (windowHeight - 50));
var shotHUD = new cHUD((windowWidth - (windowWidth - 100)), (windowHeight - 50));
var scoreHUD = new cHUD(10, 10);