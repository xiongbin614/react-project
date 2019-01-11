define(function(){
	return{
		login:function($){
					showName();
			
					longins();

			function longins(){
				$(".Login").click(function(){
				var phone=$("input[name='Lphone']").val();
				var psw=$("input[name='Lpsw']").val();
				$.ajax({
					type:"get",
					url:"php/login.php?phone="+phone+"&psw="+psw,
//					data:"phone="+phone+"$psw"+psw,
					async:true,
					success:function(res){//返回1登录成功   返回2用户名不存在 返回0密码错误
						switch (res){
							case "1":
								toPage(phone);
								break;
							case "0":
								confirm("密码错误、请重新输入...");
								break;
							default:
								confirm("用户名不存在、请重新输入...");
								break;
						}
					}
				});
			})
			}
//			登录成功后跳转页面
			function toPage(phone){
//				将用户名保存在localstarge里面
				document.cookie="phone="+phone;
//				localStorage.setItem("phone", phone);
//				 console.log(getCookie("phone")) ;
//				登录成功返回上一页
				window.location.href="index.html";
//				window.history.back(-1);
//				showName();

				
			}
//			判断用户是否登录,渲染用户名
			function showName(){
//				console.log(getCookie("phone"));
				if(getCookie("phone")==undefined){
					$(".useNames").html('<a href="login.html">请登录 </a><a href="register.html"> 注册</a>');
//					$(".login1").html("您好！请 <a href="login.html"> 登录 </a> / <a href="register.html"> 注册</a>");
				}else{
					$(".useNames p:first-child").hide();
					$(".useNames p:nth-child(2)").show();
					$(".useNames p:nth-child(2) a").html( '欢迎'+getCookie("phone"));
					$(".login1").html('欢迎'+getCookie("phone"));
					 exit();
				}
			}
//			注销
			function exit(){
				$(".useNames p:nth-child(2)").click(function(){
					var flag=confirm("是否注销当前用户？");
					if(flag){
						delCookie("phone");//撤销登录
						window.location.reload();//刷新页面
					}else{
						return;
					}
				})
			}
			
//			删除cookie
		 function delCookie(key) {
		        var date = new Date();
		        date.setTime(date.getTime() - 1);
		        var delValue = getCookie(key);
		        if (!!delValue) {
		            document.cookie = key+'='+delValue+';expires='+date.toGMTString();
		        }
		    }
			
			 // 想要获取的cook键值
		function getCookie(cookie_name) {
				        var allcookies = document.cookie;
						//索引长度，开始索引的位置
				        var cookie_pos = allcookies.indexOf(cookie_name);
				
				        // 如果找到了索引，就代表cookie存在,否则不存在
				        if (cookie_pos != -1) {
				            // 把cookie_pos放在值的开始，只要给值加1即可
				            //计算取cookie值得开始索引，加的1为“=”
				            cookie_pos = cookie_pos + cookie_name.length + 1; 
				            //计算取cookie值得结束索引
				            var cookie_end = allcookies.indexOf(";", cookie_pos);
				            
				            if (cookie_end == -1) {
				                cookie_end = allcookies.length;
				
				            }
				            //得到想要的cookie的值
				            var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
				        }
				        return value;
				    }

			
		}
	}
})