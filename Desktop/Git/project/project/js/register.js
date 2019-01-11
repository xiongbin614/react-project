define(function(){
	return{
		register:function($){
			click();
			function click(){
				$(".yanzheng").click(function(){
					var val=$("input[name='iphone']").val();
					var reg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
					var phone=$.trim(val);
					var flag=reg.test(phone);
					 if(val==' '){
					 	flag=0;
					 };
					switch (flag){
						case true:
								success();
							break;
						case false:
							flied();
							break;
						default:
							$(".phoneHint").html("请输入手机号码");
							$(".phoneHint").fadeIn(100);
							break;
					}
				})
			}
//			号码不正确
			function flied(){
				$(".phoneHint").fadeOut(100);
					
						$(".yanzhengpart").css({
							border:"1px solid red"
						});
						$(".yanzhengpart span").html("输入不正确");
						$(".yanzhengpart i").css("background","red");
			}
//			号码输入正确
		function success(){
						$(".phoneHint").fadeOut(100);
						$(".yanzhengpart").css("border","1px solid green");
						$(".yanzhengpart span").html("输入正确");
						$(".yanzhengpart i").css("background","green");
						randomClick();
				}
//		产生验证码
		function randomClick(){
			$(".randomNum").click(function(){
				$("input[name='random']").attr("value",test());
				pswClick();
			})
//			密码验证
		function pswClick(){
			$("input[name='psw']").change(function(){
				if(CheckPassWord($("input[name='psw']").val())){
									$(".pswHint").html("输入正确");
									$(".pswHint").fadeIn();
									$("input[name='psw1']").change(function(){
										if($("input[name='psw']").val()==$("input[name='psw1']").val()){
											$(".psw1Hint").html("密码正确");
											$(".psw1Hint").fadeIn();
											
											//判断空的时候不能提交
											//提交表单
											submit();
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
		};
		
//		表单提交
			function submit(){
				$(".sub").css("background","#C70000");
				$(".sub").removeAttr("disabled");
				$(".sub").click(function(){
					var phoneNum=$("input[name='iphone']").val();
					var pswNum=$("input[name='psw']").val();
//					console.log(phoneNum,pswNum);
					send(phoneNum,pswNum);
				})
			}
//			发送ajax请求
		function send(val,psw){
			$.ajax({
				type:"get",
				url:"php/register1.php?phone="+val+"&psw="+psw,
				async:true,
				success:function(res){//返回数据0表示用户名存在；返回1表示注册成功
					if(res==1){
//						$(".alert").fadeIn(1000).fadeOut(3000);
						var flag=confirm("注册成功、是否登录？");
						if(flag){
						window.location.href=" login.html";
						}
						

					}else{
						$(".phoneHint").fadeIn(200);
						$(".phoneHint").html("用户名已存在");
					}
					
				}
			});
		}			
			
//		产生6位随机数
			function test(){
				var str ='';//容器
				for(var i =0;i<6;i++){//循环六次
					var num = Math.random()*9;//Math.random();每次生成(0-1)之间的数;
					num = parseInt(num,10);
					str+=num;
				}		
				return str;
						 	};
						 	
//		密码验证
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
		}

		
		
		}
		
	}
})