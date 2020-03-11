// 放大镜
$(function () {
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




})

    // ----------------------------------------------------------------------


















