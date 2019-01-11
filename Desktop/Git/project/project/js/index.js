$(function(){
//	导航栏输入框js
	$(".text").click(function(e){
		$(".serchKey").hide();
		e.stopPropagation();
	});
	$(document).click(function(e){
		$(".serchKey").show();
	});
//	侧栏返回到顶部
		 $(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        if(scroH >300){  //距离顶部大于100px时
   			$(".fhtop").show();
   			$(".fhtop").click(function(){
   				$(document).scrollTop()==0;
   			})
        }else{
   			$(".fhtop").hide();
}
})
	
	
	
	
	
	
	
	
	
	
	
})