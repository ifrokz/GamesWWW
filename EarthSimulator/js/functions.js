/* /////////////////// /*
    Author: FroKz
    Date: 27/03/17
/* /////////////////// */  

function mainControls(){
    $(document).keypress(function(event){
        if(event.which == 32){
            if(cameraNow == 1){
                cameraNow = 2;
            }else if(cameraNow == 2){
                cameraNow = 1;
            }
        }
    });   
}