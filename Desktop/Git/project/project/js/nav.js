//搜索框与侧栏js
define(function(){
	return {
		top:function($){//	侧栏返回到顶部
			$(document).scroll(function() {
	        let scroH = $(document).scrollTop();  //滚动高度
	        if(scroH <600){  //距离顶部大于100px时
	   			$(".fhtop").hide();
	        }else{
	   			$(".fhtop").show();
			}
			})
		},
		topclick:function($){
			$(".fhtop").click(function(e){
	   				$("html,body").animate({
					scrollTop: 0
				}, 300);
				return false;
				e.stopPropagation();
	   			})
		},
		nav:function($){ //导航栏搜索框
			$(".text").click(function(e){
				$(".serchKey").hide();
				e.stopPropagation();
			});
			$(document).click(function(e){
				$(".serchKey").show();
			});
		},
		banner:function($){
		var timer=setInterval(autoPlay,1000);
		var index=0;
		function autoPlay(){
		index++;
		if(index==6){
			index=-1;
		}
		$("#box>li").eq(index).stop().fadeIn().siblings().stop().fadeOut();
		$("#uu>li").eq(index).addClass("current").siblings().removeClass("current");
	}
	$("#uu>li").mouseover(function(){
		clearInterval(timer);
		index=$(this).index()-1;
		autoPlay();
	}).mouseout(function(){
		clearInterval(timer);
		
		 timer=setInterval(autoPlay,1000);
	})
	
	$("#wrapper").mouseover(function(){
		clearInterval(timer);
		$(".span1").show();
	}).mouseout(function(){
		$(".span1").hide();
		clearInterval(timer);
		 timer=setInterval(autoPlay,1000);
	})
	}
	}
	
})
