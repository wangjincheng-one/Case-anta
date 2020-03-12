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
        for (let i in data.data) {
            // console.log(data.data[i])
            let str = `
    <tr>
        <td class="td-check">
         <label class="checkbox-label checkbox-one">
            <input type="checkbox" class=" ck">
         </label>
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
            <div class="td-cont-bottom">
                <p class="fl">
                    <span>数量：</span>
                    <span  class="num-minus">-</span>
                <input type="text" class="num-input"  id="num" value="${data.data[i].pnum}">
                    <span class="num-plus">+</span>

                </p>
                <p class="fr">
                <a href="#" class="delete-one" id="delBtn">删除</a>
                </p>
            </div>

        </td>
    </tr>
    
    `;
    $(".cart-table").append(str);
    // 添加点击事件
   
    
    }//for 循环结束
    for (let i in $("tr").length) {
        console.log(i)
    }
    $(" .num-minus").click(()=> {
        let oNum = document.getElementById("num");
        // $("#num").html($("#num").val() -1)  ;
        // console.log($("#num").val() -1)
        oNum.value--;
        if (oNum.value <= 1) {
            oNum.value = 1
        }
        console.log("jian")
        $(this).val(oNum.value)
        // oNum.value--;
        // if (oNum.value <= 1) {
        //     oNum.value = 1
        // }
    })
$(".num-plus").click(() =>{
        let oNum = document.getElementById("num");
        oNum.value ++
        console.log("jia")
        $("#num").val(oNum.value)

    })
    $("#delBtn").click(function () {
        // $(this).parent().html("")
       $(".cart-table").children().eq(i).remove()
    })
    
})//then回调函数结束

})
    
    // function ShoppingCar() {
    //     if (localStorage.getItem("carData")) {
    //         this.carData = JSON.parse(localStorage.getItem("carData"))
    //     } else {
    //         this.carData = {};
    //     }
    // }
    // // 存数据 存id num
    // ShoppingCar.prototype.saveData = function (id, num, termi) {
    //     if (this.carData[id] === undefined || termi) {
    //         this.carData[id] = num;
    
    //     }
    //     else {
    //         this.carData[id] += num;
    //     }
    //     localStorage.setItem("carData", JSON.stringify(this.carData))
    // }
    // ShoppingCar.prototype.showList = function () {
    //     this.cartList = document.getElementById("cartList")
    //     let productData = JSON.parse(localStorage.getItem("productDataNew"));
    //     let str = "";
    //     for (let id in this.carData) {
    //         str += `
    //     <li data-id="${id}">
    //     <input type="checkbox" class="ck">
    //     <img  src="${productData[id].imgsrc}">
    //     <span>${productData[id].title}</span>
    //     <span class="minus">-</span>
    //     <input type="text" value="${this.carData[id]}" class="num">
    //     <span class="plus">+</span>
    //     <span class="price">${productData[id].price}</span>
    //     <span class="perTotalPrice">${this.carData[id] * productData[id].price}</span>
    //     <input type="button" value="删除" class="delBtn">
    //     </li>
    //     `;
    //     }
    //     this.cartList.innerHTML = str;
    // }
    // // 更新数据方法
    // ShoppingCar.prototype.updateData = function () {
    //     this.checkAll = document.getElementById("checkAll")
    //     this.totalPrice = document.getElementById("totalPrice");
    //     this.list = this.cartList.querySelectorAll("li")
    //     this.ck = this.cartList.querySelectorAll(".ck")
    //     this.minus = this.cartList.querySelectorAll(".minus")
    //     this.plus = this.cartList.querySelectorAll(".plus")
    //     this.num = this.cartList.querySelectorAll(".num")
    //     this.price = this.cartList.querySelectorAll(".price")
    //     this.perTotalPrice = this.cartList.querySelectorAll(".perTotalPrice");
    
    
    //     for (let i = 0; i < this.minus.length; i++) {
    //         this.minus[i].onclick = () => {
    //             this.num[i].value--;
    //             if (this.num[i].value <= 1) {
    //                 this.num[i].value = 1;
    //             }
    //             update(i);
    //             this.getTotalPrice();
    //         }
    
    //         // 加号
    //         this.plus[i].onclick = () => {
    //             this.num[i].value++;
    //             update(i);
    //             this.getTotalPrice();
    //         }
    //         // 文本框添加事件
    //         this.num[i].oninput = () => {
    //             if (this.num[i].vlue <= 1) {
    //                 this.num[i].value = 1;
    //             }
    //             update(i);
    //             this.getTotalPrice();
    
    //         }
    //         // 复选框
    //         this.ck[i].onclick = () => {
    //             let count = 0;
    //             for (let j = 0; j < this.ck.length; j++) {
    //                 if (this.ck[j].checked) {
    //                     count++
    //                 }
    //             }
    //             if (count === this.ck.length) {
    //                 this.checkAll.checked = true;
    //             } else {
    //                 this.checkAll.checked = false;
    //             }
    //             this.getTotalPrice();
    //         }
    //     }
    //     let update = (i) => {
    //         this.perTotalPrice[i].innerText = this.num[i].value * this.price[i].innerText
    //         let id = this.list[i].getAttribute("data-id")
    //         let num = this.num[i].value;
    //         this.saveData(id, num, true)
    
    //     }
    //     this.checkAll.onclick = () => {
    //         for (let i = 0; i < this.ck.length; i++) {
    //             this.ck[i].checked = this.checkAll.checked;
    //         }
    //         this.getTotalPrice();
    //     }
    
    // }
    // ShoppingCar.prototype.getTotalPrice = function () {
    //     let total = 0;
    //     for (let i = 0; i < this.ck.length; i++) {
    //         if (this.ck[i].checked) {
    //             total += Number(this.perTotalPrice[i].innerText);
    //         }
    //     }
    //     this.totalPrice.innerText = total;
    // }
    // ShoppingCar.prototype.removeData = function () {
    //     // 获取删除按钮
    //     this.delBtn = this.cartList.querySelectorAll(".delBtn")
    //     for (let i = 0; i < this.delBtn.length; i++) {
    //         this.delBtn[i].onclick = () => {
    //             this.cartList.removeChild(this.list[i]);
    //             this.ck[i].checked = false;
    //             let id = this.list[i].getAttribute("data-id")
    //             delete this.carData[id];
    //             localStorage.setItem("carData", JSON.stringify(this.carData))
    //             this.getTotalPrice();
    //         }
    //     }
    // }  

    // let shoppingCart = new ShoppingCart();
    // shoppingCart.showList();
    // shoppingCart.removeData();
    // shoppingCart.updateData()










