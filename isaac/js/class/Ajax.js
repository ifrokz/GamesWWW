function Ajax(){
    this.sendRegister = function(){
        user = $("#userRegister").val();
        pass = $("#passRegister").val();
        repass = $("#repassRegister").val();
        email = $("#emailRegister").val();
        $.ajax({
            url : 'inc/register.php',
            data : {user: user, pass: pass, repass: repass, email: email},
            type : 'POST',
            dataType : 'html',
            success : function(data) {
                $("#registerInputs").append("<center>"+data+"</center>");
            },
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }
}