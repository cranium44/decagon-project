$(function(){
    $('#login').on('click', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        console.log("form input "+username+ " "+password)

        
            $.ajax({
                type: 'GET',
                url: "http://localhost:3000/login",
            
                success: function(result){
                    console.log(result);
                    if ((result.username === username)&&(result.password===password)) {
                        document.location.href = "pages/main.html";
                    }
                },
                error: function(){
                    console.error("incorrect login");
                }
            });

    })
});