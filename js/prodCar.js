$(function () {
    // 1.显示用户
    var uData = JSON.parse(localStorage.getItem("uData"));
    // console.log(uData)
    $(".cart-login h4").html(uData.uusername);
    $(".cart-login p").html("")
    // 2.查询用户购物车中的商品 接口
    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
        id: uData.uid
    }).then(data => {
        // console.log(data)
        // console.log(data.data)//是个数组
        var str ="";
        for (var i = 0;i< data.data.length;i++) {
            // console.log(data.data[i])
             str += `
    <tr >
        <td class="td-check">
            <input type="checkbox" class="ck">
        </td>
        <td class="td-img">
         <a href="" title="">
            <img src="${data.data[i].pimg}" alt="">
         </a>
        </td>
        <td class="td-cont">
            <div class="td-cont-top">
                <div class="fl">
                <h5>${data.data[i].pname}</h5>
                <p><span>颜色:象牙白/超氢蓝;尺码:40</span></p>
                </div>
                    <div class="fr">
                     <span class="nowprice">${data.data[i].pprice}</span>
                    <span class="pprice" style="">￥599.00</span>
                    </div>
                </div>
              </div>
        <div class="td-cont-bottom" data-id="${data.data[i].pid}">
            <p class="fl"  >
                <span>数量：</span>
                <span class="num-minus">-</span>
                <input type="text" class="num-input"   value="${data.data[i].pnum}">
                <span class="num-plus">+</span>
            </p>
            <p class="fr" >
                <a href="" class="delete-one" id="delBtn">删除</a>
                </p>
            </div>
        </td>
    </tr>
    `;
}//for 循环结束===============================================================
    $(".cart-table").html(str);
    // 添加点击事件
// 减号  数量减一
    $(".num-minus").click((e)=> {
        // console.log("jian")
        let subNum = Number($(e.target).next().val())-1;
        $(e.target).next().val(subNum)
        $(this).next().val(subNum)
        // console.log($(".num-minus").next().val(subNum))
        if( $(e.target).next().val() <= 1){
            $(e.target).next().val(1)
        }
        // $(this).parent().find("input").val()
     $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php",{
            pid: $(".num-minus")
                .parent().parent()
                .attr("data-id"),
            uid:uData.uid,
            pnum: $("num-input").val() 
        }).then(data=>{
         console.log(data);
     })
    
    })
// 加号数量加一 
    $(".num-plus").click((e) =>{
        // console.log("jia")
        // console.log($(".num-plus").prev().val())
        // let indexNum = $(e.target).index();
        // console.log(indexNum)

        let subNum = Number($(e.target).prev().val()) + 1;
        $(e.target).prev().val(subNum)
        $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php",{
            pid: $(".num-plus")
                .parent().parent()
                .attr("data-id"),
            uid:uData.uid,
            pnum: $(".num-input").val() 
        }).then(data=>{
         console.log(data);//修改成功
     })
    })
    // 操作 input
    $(".num-input").change(function() {
        $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
            pid: $(".num-plus")
            .parent().parent()
            .attr("data-id"),
        uid:uData.uid,
        pnum: $(".num-input").val() 
        }).then(data => {
          console.log(data);
        });
      });
// 删除 当前行============================
    $("#delBtn").click(function (e) {
        e.preventDefault();
        // console.log($(this))
        // $(this).parents().html("")
        $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php",{
        pid:$(this).parent().parent().attr("data-id"),
        uid:uData.uid,
        }).then(data=>{
            console.log(data)
    //    console.log( $(this).parent().parent().parent().parent())
            $(this).parent().parent().parent().parent().remove();
        })
       
        // console.log()
    })
    // var index = $(this).index()
    //    $(".cart-table").children().eq(index).remove()
   

// 全选=========================================================================

// console.log($("#checkAll"))
$("#checkAll").click(function(){
    if(this.checked){
        // console.log($(".ck"))
        $(".ck").prop("checked",true)
    }else{
        // console.log("noall")
        $(".ck").prop("checked",false)
    }
})
// console.log( $(".ck"))
$(".ck").click(function(){
    var j = 0;
    $(".ck").map(function(){
    if($(this).prop("checked")) {
        j++
    }
    if(j == $(".ck").length){
        $("#checkAll").prop("checked",true)
    }else{
        $("#checkAll").prop("checked",false)
    }
    })
    if(j == 0){
        $("#totalPrice").html(0);
    }
if(this.checked) {
    // console.log("ck")
}else if(!this.checked){
    // console.log("no")
}else{
    // console.log("other")
}
})
//------------------------页面总价显示函数---------------------
    // var totalPrice = function(){
    //     let addAll = 0
    //     for(let i = 0; i < $(".ck").length; i++){
    //         if($(".ck").eq(i).prop('checked')){
    //             addAll += Number($(".perTotalPrice").eq(i).html());
    //             $("#totalPrice").html(addAll)
    //         }
    //     }
    // }
    // console.log($(".checkbox-input").eq(1))
    $(".checkbox-input").eq(1).click(function(){
        // $(".ck").prop("checked",true)
        // 
        if(this.checked){
            // console.log($(".ck"))
            $(".ck").prop("checked",true)
            $("#checkAll").prop("checked",true)
        }else{
            // console.log("noall")
            $(".ck").prop("checked",false)
            $("#checkAll").prop("checked",false)
        }

    })
})//then回调函数结束

})
    
    





