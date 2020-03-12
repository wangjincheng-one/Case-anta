$(function() {
     // 存取信息
     var uData = {};
    $("#loginBtn").click(function() {
        $.get("http://jx.xuzhixiang.top/ap/api/login.php",{
            username:$("#username").val(),
            password:$("#psw").val()
        }).then(data=>{
            if(data.code ==1){
                location.href="index.html";
            console.log(data);
           

            }else{
                alert("用户名或密码错误请重试")
            }
            // 存取信息
            uData = {
                "uid" :data.data.id,
                "uusername":data.data.username,
                "upassword": data.data.password,
                "utoken" :data.data.token
               
            };
            localStorage.setItem("uData",JSON.stringify(uData));
            // console.log(uData)
        })
    })
















})