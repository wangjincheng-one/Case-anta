$(function(){
     //  二级导航
//  console.log( $(".header-nav .nav-list .nav-item"))
 $(".header-nav .nav-list .nav-item").mouseenter(function() {
   // console.log(this)
 var index = $(this).index();
 $(".sub-nav-panel").eq(index).show().siblings(".sub-nav-panel").hide();
  
 
 
 })  
     
 $(".header-nav").mouseleave(function () {
      $(".sub-nav-panel").hide();
 
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