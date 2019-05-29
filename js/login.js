$(function(){
    $('#login').on('click', function(){
        var username = $('#username').value;
        var password = $('#password').value;
        console.log("form input "+username+ " "+password)

        //make get request
        // $("button").click(function(){
        //     $.ajax({
        //         type: 'GET',
        //         url: "http://localhost:3000/login",
            
        //         success: function(result){
        //             console.log(result);
        //             if (result.username === username) {
        //                 console.log('success');
        //             }
        //         }
        //     });
        // });
        
    })
});