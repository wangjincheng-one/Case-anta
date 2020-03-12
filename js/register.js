$(function () {
    //     $("#submit_button").click(function() {
    //         // console.log(  $("#submit_button"))
    //         // 1.验证用户名是否存在
    //         $.get("http://jx.xuzhixiang.top/ap/api/checkname.php",{
    //          username: $("#username").val()},data =>{
    // console.log(data)
    //          })

    //     })









    // $("#username").change(function () {
    //     $.get("http://jx.xuzhixiang.top/ap/api/checkname.php",{
    //         username:$("#username").val()},
    //         data=>{
    //             if (data.code ==1){
    //                 $("#submit_button").click(function(){

    //                 })
    //             } 
    //          }
    //     );

    // });
    $("#submit_button").click(function () {
        $.get("http://jx.xuzhixiang.top/ap/api/checkname.php", {
            username: $("#username").val()
        },
            data => {
            if (data.code == 1) {
              $.get("http://jx.xuzhixiang.top/ap/api/reg.php" ,{
                  username:$("#username").val(),
                  password : $("#password").val()
              } ,data=>{
                 if(data.code ==1){
                     location.href ="login.html";//注册成功跳转到登录页面
                    // console.log(1)
                 }
              })
            }else{
                alert("用户名重名");
            }
            }
        );

    });




})