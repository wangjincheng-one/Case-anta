$(function() {
  /* 从localstorage 里获取数据 */
  var uData  = JSON.parse(localStorage.getItem("uData"));
  // console.log(uData)
  // console.log(uData.uusername)
  $("#dengru").html("热烈欢迎" + uData.uusername)
//  二级导航

$(".nav-list .nav-item").mouseenter(function() {
  // console.log(this)
var index = $(this).index();
$(".sub-nav-panel").eq(index).show()
.siblings(".sub-nav-panel").hide();
 
})  
    
$(".header-nav").mouseleave(function () {
     $(".sub-nav-panel").hide();

})  
// console.log($(".sub-nav-panel ul li a"))
$(".nav-list .nav-item").click(function() {
  location.href ="prodList.html"
})
$(".sub-nav-panel ul li a").click(function() {
  location.href ="prodList.html"
})
 
// stars 动画效果
// console.log($("#stars"))

$("#stars li").mouseenter(function() {
  var index = $(this).index();
  $("#stars li").eq(index).children().find("img").css({display:"block;"})
//  console.log( $("#stars li").eq(index).children().find("img"))
})  
$("#stars li").mouseleave(function() {
  var index = $(this).index();
  $("#stars li").eq(index).children().find("img:last-child").css({display:"none",bottom:"0"})
 console.log( $("#stars li").eq(index).children().find("img:last-child"))
})  
    
$("#xin-List ul li").mouseenter(function () {
  var index = $(this).index();
  $("#xin-List ul li").eq(index).find("div").animate({
    top:"-20px"
  }).end().css({border:"1px solid #f00",transform:"translateY(-10px)"})
  
})
$("#xin-List ul li").mouseleave(function () {
  var index = $(this).index();

  $("#xin-List ul li").eq(index).find("div").animate({
    top:"0px"}).end().css({border:"none",transform:"translateY(0)"})
})

$("#jing-List ul li").mouseenter(function () {
  var index = $(this).index();
  $("#jing-List ul li").eq(index).find("div").animate({
    top:"-20px"
  }).end().css({border:"1px solid #f00",transform:"translateY(-10px)"})
  
})
$("#jing-List ul li").mouseleave(function () {
  var index = $(this).index();

  $("#jing-List ul li").eq(index).find("div").animate({
    top:"0px"}).end().css({border:"none",transform:"translateY(0)"})
})



















//   回到顶部
$("#getTop .goto-top").click(function(){
    
    $('html,body').animate({scrollTop:0},1000);
    // console.log(1)

})
// 购物车
// $("#getTop .cover-cart").click(function(){
//     console.log(1)

//     // location.href("prodCar.html");
 })