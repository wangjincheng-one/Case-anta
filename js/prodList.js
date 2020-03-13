$(function () {
    //  二级导航
    $(".nav-list .nav-item").mouseenter(function () {
        // console.log(this)
        var index = $(this).index();
        $(".sub-nav-panel").eq(index).show().siblings(".sub-nav-panel").hide();
    })

    $(".header-nav").mouseleave(function () {
        $(".sub-nav-panel").hide();
    })
    // 商品列表接口  需要传用户id
    //      $.get("http://jx.xuzhixiang.top/ap/api/productlist.php",{})  
    //      .then(data=>{
    //          console.log(data)
    //      }) 
    // //如何使用自己的数据1.通过接口添加数据
    var uData = JSON.parse(localStorage.getItem("uData"));
    // console.log(uData)
    // $.post("http://jx.xuzhixiang.top/ap/api/goods/goods-add.php"
    //     ,{
    //     pname:"good-4",
    //     pprice:"245",
    //     pimg:"img/good-shoes-4.jpg",
    //     pdesc:"安踏男鞋速战3代篮球鞋篮球系列",//商品描述
    //     uid:uData.uid,
    // }).then(data=>{
    //   console.log(data);
    // })
    // 删除数据
    // $.get("http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php",
    //      {
    //        pid:"197724",
    //        uid:"33091",
    //        token:"a6ffe98f15f6b83d36e712c8b05feb93"
    //      }
    // ).then(data=>{
    //   console.log(data)
    // })
    //  查询商品列表数据
    $.get("http://jx.xuzhixiang.top/ap/api/productlist.php", {
        uid: uData.uid
    }).then(data => {
        // console.log(data)

        var str = "";
        for (let i in data.data) {
            str += `<li class="good-item" >
                <div class="good-body" id ="good"  data-id="${data.data[i].pid}">
                    <a href="prodDetail.html?${data.data[i].pid}" class="pimg" data-id="${data.data[i].pid}">
                        <img  src="${data.data[i].pimg}"
                            alt="">
                    </a>
                    <a href="prodDetail.html?${data.data[i].pid}" class="pdesc" data-id="${data.data[i].pid}">${data.data[i].pdesc}</a>
                    <a href="prodDetail.html?${data.data[i].pid}" class="pprice" data-id="${data.data[i].pid}"><span>￥${data.data[i].pprice}</span></a>
                </div>
            </li>`

        }
        $(".good-main").append(str);
        $(".good-item").hover(function () {
            var index = $(this).index();
            $(".good-item").eq(index).find("#good").css({ border: "1px solid #f00", transform: "translateY(-10px)" })
            // console.log("enter")
        }, function () {
            var index = $(this).index();
              
            $(".good-item").eq(index).find("#good").animate({
                top: "0"
            }).css({ border: "none", transform: "translateY(0px)" })
            console.log("out")

        })

        // let shoppingCar = new ShoppingCar();

        // let goods = document.querySelectorAll(".good-item");
        $(".good-item #good").click(function () {
            // console.log($(this).attr("data-id"))


            var productId = {};
            productId = {
                pid: $(this).attr("data-id")

            }
            localStorage.setItem("productId", JSON.stringify(productId));
            // location.href = "prodDetail.html";

        })
    })











    //   回到顶部
    $("#getTop .goto-top").click(function () {

        $('html,body').animate({ scrollTop: 0 }, 1000);
        // console.log(1)

    })
    // 购物车
    // $("#getTop .cover-cart").click(function(){
    //     console.log(1)

    //     // location.href("prodCar.html");
})
// 购物车类  方法 
function ShoppingCar() {
    if (localStorage.getItem("cartData")) {
        this.cartData = JSON.parse(localStorage.getItem("cartData"))
    } else {
        this.cartData = {};
    }
}
// 存数据 存id num
ShoppingCar.prototype.saveData = function (id, num, termi) {
    if (this.cartData[id] === undefined || termi) {
        this.cartData[id] = num;

    }
    else {
        this.cartData[id] += num;
    }
    localStorage.setItem("cartData", JSON.stringify(this.cartData))
}
ShoppingCar.prototype.showList = function () {
    this.cartList = document.getElementById("cartList")
    let productData = JSON.parse(localStorage.getItem("productDataNew"));
    let str = "";
    for (let id in this.cartData) {
        str += `
<li data-id="${id}">
<input type="checkbox" class="ck">
<img  src="${productData[id].imgsrc}">
<span>${productData[id].title}</span>
<span class="minus">-</span>
<input type="text" value="${this.cartData[id]}" class="num">
<span class="plus">+</span>
<span class="price">${productData[id].price}</span>
<span class="perTotalPrice">${this.cartData[id] * productData[id].price}</span>
<input type="button" value="删除" class="delBtn">
</li>
`;
    }
    this.cartList.innerHTML = str;
}
ShoppingCar.prototype.updateData = function () {
    this.checkAll = document.getElementById("checkAll")
    this.totalPrice = document.getElementById("totalPrice");
    this.list = this.cartList.querySelectorAll("li")
    this.ck = this.cartList.querySelectorAll(".ck")
    this.minus = this.cartList.querySelectorAll(".minus")
    this.plus = this.cartList.querySelectorAll(".plus")
    this.num = this.cartList.querySelectorAll(".num")
    this.price = this.cartList.querySelectorAll(".price")
    this.perTotalPrice = this.cartList.querySelectorAll(".perTotalPrice");


    for (let i = 0; i < this.minus.length; i++) {
        this.minus[i].onclick = () => {
            this.num[i].value--;
            if (this.num[i].value <= 1) {
                this.num[i].value = 1;
            }
            update(i);
            this.getTotalPrice();
        }

        // 加号
        this.plus[i].onclick = () => {
            this.num[i].value++;
            update(i);
            this.getTotalPrice();
        }
        // 文本框添加事件
        this.num[i].oninput = () => {
            if (this.num[i].vlue <= 1) {
                this.num[i].value = 1;
            }
            update(i);
            this.getTotalPrice();

        }
        // 复选框
        this.ck[i].onclick = () => {
            let count = 0;
            for (let j = 0; j < this.ck.length; j++) {
                if (this.ck[j].checked) {
                    count++
                }
            }
            if (count === this.ck.length) {
                this.checkAll.checked = true;
            } else {
                this.checkAll.checked = false;
            }
            this.getTotalPrice();
        }
    }
    let update = (i) => {
        this.perTotalPrice[i].innerText = this.num[i].value * this.price[i].innerText
        let id = this.list[i].getAttribute("data-id")
        let num = this.num[i].value;
        this.saveData(id, num, true)

    }
    this.checkAll.onclick = () => {
        for (let i = 0; i < this.ck.length; i++) {
            this.ck[i].checked = this.checkAll.checked;
        }
        this.getTotalPrice();
    }

}
ShoppingCar.prototype.getTotalPrice = function () {
    let total = 0;
    for (let i = 0; i < this.ck.length; i++) {
        if (this.ck[i].checked) {
            total += Number(this.perTotalPrice[i].innerText);
        }
    }
    this.totalPrice.innerText = total;
}
ShoppingCar.prototype.removeData = function () {
    // 获取删除按钮
    this.delBtn = this.cartList.querySelectorAll(".delBtn")
    for (let i = 0; i < this.delBtn.length; i++) {
        this.delBtn[i].onclick = () => {
            this.cartList.removeChild(this.list[i]);
            this.ck[i].checked = false;
            let id = this.list[i].getAttribute("data-id")
            delete this.cartData[id];
            localStorage.setItem("carData", JSON.stringify(this.cartData))
            this.getTotalPrice();
        }
    }
}  