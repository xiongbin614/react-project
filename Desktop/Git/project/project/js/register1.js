define(function(){
	return{
		register:function($){
			$(".yanzheng").click(function(){
				var val=$("input[name='iphone']").val();
				var reg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;

				var phone=$.trim(val);	
				if(reg.test(phone)){
						$(".phoneHint").fadeOut(100);
						$(".yanzhengpart").css("border","1px solid green");
						$(".yanzhengpart span").html("输入正确");
						$(".yanzhengpart i").css("background","green");
						$(".randomNum").click(function(){
							$("input[name='random']").attr("value",test());
							$("input[name='psw']").change(function(){
								if(CheckPassWord($("input[name='psw']").val())){
									$(".pswHint").html("输入正确");
									$(".pswHint").fadeIn();
									$("input[name='psw1']").change(function(){
										if($("input[name='psw']").val()==$("input[name='psw1']").val()){
											$(".psw1Hint").html("密码正确");
											//判断空的时候不能提交
										}else{
											$(".psw1Hint").fadeIn();
											$(".psw1Hint").html("密码与上面不符合");
										}
									})
								}else{

									$(".pswHint").fadeIn();
									$(".pswHint").html("必须为字母加数字且长度不小于8位");
								}
							})
						})
					}
				else if(val==" "){
						$(".phoneHint").html("请输入手机号码");
						$(".phoneHint").fadeIn(100);
					
					}
				else{
						$(".phoneHint").fadeOut(100);
					
						$(".yanzhengpart").css({
							border:"1px solid red"
						});
						$(".yanzhengpart span").html("输入不正确");
						$(".yanzhengpart i").css("background","red");
					}
			})
			
			
			
			
//			产生6位随机数
			function test(){
				// 0-9的随机数
				var str ='';//容器
				for(var i =0;i<6;i++){//循环六次
					var num = Math.random()*9;//Math.random();每次生成(0-1)之间的数;
					num = parseInt(num,10);
					str+=num;
				}		
				return str;
						 	};
//			密码验证
				function CheckPassWord(password) {//必须为字母加数字且长度不小于8位
				   var str = password;
				    if (str == null || str.length <8) {
				        return false;
				    }
				    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
				    if (!reg1.test(str)) {
				        return false;
				    }
				    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
				    if (reg.test(str)) {
				        return true;
				    } else {
				        return false;
				    }
				};
//				function sumbit(){
//					if(){
//						
//					}
//				}

		}
	}
})