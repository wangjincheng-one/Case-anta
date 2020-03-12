// 放大镜
$(function () {
    // 放大镜开始=====================================================
    function Zoom() {
        this.zoomBox = $("#zoomBox");
        this.midBox = $("#midBox");
        this.midImg = this.midBox.children[0];
        this.glass = $("#glass");
        this.bigBox = $("#bigBox");
        this.bigImg = this.bigBox.children[0];
        this.smallBox = $("#smallBox");
        this.smallImg = this.smallBox.children;


    }
    Zoom.prototype.show = function () {
        this.midBox.onmouseover = () => {
            this.glass.style.display = "block";
            this.bigBox.style.display = "block"
        }
        this.midBox.onmouseout = () => {
            this.glass.style.display = "none";
            this.bigBox.style.display = "none"
        }
        this.midBox.onmousemove = (e) => {
            var e = e || event;//兼容性
            // pageX 鼠标到页面距离，包含scroll
            // offsetX 鼠标相对于事件源位置
            var l = e.pageX - this.zoomBox.offsetLeft - this.glass.offsetWidth / 2;
            var t = e.pageY - this.zoomBox.offsetTop - this.glass.offsetHeight / 2;
            // 判定边界
            var mw = this.midBox.offsetWidth - this.glass.offsetWidth;
            var mh = this.midBox.offsetHeight - this.glass.offsetHeight;
            if (l <= 0) {
                l = 0
            } else if (l >= mw) {
                l = mw;
            }
            if (t <= 0) {
                t = 0
            } else if (t >= mh) {
                t = mh;
            }
            // l = l<= 0 ? 0 : l >= mw ? mw : l;
            // t = t<= 0 ? 0 : t >= mh ? mh:t;
            this.glass.style.top = t + "px"
            this.glass.style.left = l + "px"
            var r = this.midBox.offsetWidth / this.glass.offsetWidth
            // this.bigImg.style.left = -r * l + "px"
            // this.bigImg.style.top = -r * t + "px"
            this.bigImg.style.left = - this.glass.offsetLeft / this.midBox.offsetWidth * this.bigImg.offsetWidth + "px";

            this.bigImg.style.top = - this.glass.offsetTop / this.midBox.offsetHeight * this.bigImg.offsetHeight + "px";


            // 小图改变，大图和midBox.src 改变
            for (let i = 0; i < this.smallImg.length; i++) {
                this.smallImg[i].onclick = () => {
                    this.midImg.src = this.smallImg[i].src
                    this.bigImg.src = this.smallImg[i].src
                }
            }
        }

    }
    var zoom1 = new Zoom();
    zoom1.show();
// ----------------------------------------------------------------------
var uData  = JSON.parse(localStorage.getItem("uData"));

$.get("http://jx.xuzhixiang.top/ap/api/productlist.php",{
    uid:uData.uid
   }).then(data=>{
//     //    console.log(data);
//     // $("#midBox img").src(data.data.pimg)
// console.log(data.data[1].pimg)
// $("#midBox img").attr("src",data.data[1].pimg)
// $("#smallBox img").attr("src",data.data[1].pimg)
// $("#bigBox img").attr("src",data.data[1].pimg)
// $(".goods-name").html(data.data[1].pdesc)
// $(".goods-price").html(data.data[1].pprice)

   })
var productId = JSON.parse(localStorage.getItem("productId"))   
console.log(productId.pid)
// 根据商品id获取商品详情接口

$.get("http://jx.xuzhixiang.top/ap/api/detail.php",{id:productId.pid})
.then(data=>{
// console.log(data);
 $("#midBox img").attr("src",data.data.pimg)
 $("#smallBox img").attr("src",data.data.pimg)
 $("#bigBox img").attr("src",data.data.pimg)
 $(".goods-name").html(data.data.pdesc)
 $(".goods-price").html(data.data.pprice)
})
// 给用户购物车中添加商品 接口
$.get("http://jx.xuzhixiang.top/ap/api/add-product.php",{
    uid:uData.uid,
    pid:productId.pid,
    pnum:$("#selectNum").val()
})
.then(data=>{
    console.log(data)
})

// 跳转到购物车页面
   $("#addBtn").click(function(){
       $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
           id: uData.uid
        }).then(data =>{
            let cartData = {}
            for (let i in data.data) {
                carData = {
                    "id":data.data[i].id,
                    "pid": data.data[i].pid,
                    "pnum": data.data[i].pnum,
                    "uid": data.data[i].uid,
                    "pname": data.data[i].pname,
                    "pprice": data.data[i].pprice,
                    "pimg": data.data[i].pimg,
                    "pdesc": data.data[i].pdesc
                }
                localStorage.setItem("carData",JSON.stringify(carData))
            }
        })
        
           location.href ="prodCar.html";
    // console.log(carData)
   })//点击事件结束

  
// 存数据 存id num

})



















