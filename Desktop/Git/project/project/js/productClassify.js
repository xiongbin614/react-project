define(function(){
	return{
		getLocation:function($){
					$.ajax({
						type:"get",
						url:"json/json3.json",
						async:true,
						success:function(res){
//							console.log(getUrlParam("name"));
							creatLi(res);
							details(res);
						}
					});
//					分类页面渲染
				function creatLi(arr){
					var str="";
					for (var i = 0; i < arr.length; i++) {
						if(arr[i].name==getUrlParam("name")){
							for(var j=0; j<arr[i].data.length;j++){
								var li=document.createElement("li");
								str=`
									<p><a href="productDetails.html?id=${arr[i].data[j].id}" target="_blank"><img src="${arr[i].data[j].img}"/></a></p>
									<p><a href="productDetails.html?id=${arr[i].data[j].id}" target="_blank">${arr[i].data[j].name}"</a></p>
									<p>${arr[i].data[j].price}"</p>
									<div class="p-button">
										<div class="choosebuy">
											<span>选购</span>
										</div>
										<div class="evaluate">
											<span>364人评价</span>
										</div>
									</div>
								`
							li.innerHTML=str;
							$(".flMain-show>ul").append(li);	
							}
						}
					}
				}
//				详情页面渲染
			function details(arr){
				for (var i = 0; i < arr.length; i++) {
					for(var j=0;j<arr[i].data.length;j++){
						if(arr[i].data[j].id==getUrlParam("id")){
//							console.log(arr[i].data[j].id);
							$(".smollmainDL-img img").attr("src","img/"+arr[i].data[j].id+"mp.png");
							$(".bigBox img").attr("src","img/"+arr[i].data[j].id+"mp.png");
							$(".price span").html(arr[i].data[j].price);
							$(".mainDR-title h1").html(arr[i].data[j].name);
//							小图片
							$(".btnCenter li:nth-child(1)").find("img").attr("src","img/78_78_"+arr[i].data[j].imglist[0]+".png");
							$(".btnCenter li:nth-child(2)").find("img").attr("src","img/78_78_"+arr[i].data[j].imglist[1]+".png");
							$(".btnCenter li:nth-child(3)").find("img").attr("src","img/78_78_"+arr[i].data[j].imglist[2]+".png");
							$(".btnCenter li:nth-child(4)").find("img").attr("src","img/78_78_"+arr[i].data[j].imglist[3]+".png");
							$(".btnCenter li:nth-child(5)").find("img").attr("src","img/78_78_"+arr[i].data[j].imglist[4]+".png");
						}
					}
				}
			}
				
				
//			获取id与name函数
			 function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
			 }
		},
		
//		加入购物车
		addCart:function($){
			clickCart();
//			login();
//			function login(){
//				if(document.cokie){
//					clickCart();
//				}else{
////					alert("请登录")
//				}
//			}
			function clickCart(){
//				点击加入购物车
				$(".shopCar").click(function(){
//					location.reload();
					if(document.cookie){
						var urlId=getUrlParam("id");//商品id
						var phone=getCookie("phone");//登录用户名
						var obj=localStorage.valueOf();//所有localStorage数据
						var falg=true;
						for(var i in obj){
							if(i==phone){//存在   在给它添加一条
								addMoreGoods(phone);
								var flag= confirm("添加成功，是否去结算");
								if(flag){
									location.href="myCart.html";
								}
								falg=false;
//								alert("存在");
							}
						}
						if(falg){
							
							addGoods(phone,urlId);//产生一个localStorage数据，并且以对象存储
							var flag= confirm("添加成功，是否去结算");
								if(flag){
									location.href="myCart.html";
								}
						}
					}else{
						alert("请登录在添加购物车");
					}

				})
			}
			function addGoods(phone,goodsId){
//				创建一个对象
				var objs={};
				objs.id=goodsId;
				objs.nums=1;
				var arr=[];
				arr.push(objs);
				var str=JSON.stringify(arr);
				localStorage.setItem(phone,str);//不存在添加一条	
			}
//			添加多个相同商品
			function addMoreGoods(phone){//传入用户名
				var str= localStorage.getItem(phone);
				var arr=JSON.parse(str);
				
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].id==getUrlParam("id")){
//						console.log(arr[i].id)
						 arr[i].nums++;
						var str1=JSON.stringify(arr);
						localStorage.setItem(getCookie("phone"),str1);
//						console.log(str1);
					}else{
						var obj={};
						 obj.id=getUrlParam("id");
						 obj.nums=1;
//						 console.log(obj);//{ id: "1540895551625", nums: 1 }
						 var str=localStorage.getItem(getCookie("phone"));
						var arr2=JSON.parse(str);//{"id":"1545877507789","nums":2}
//						console.log(arr2);
						arr2.push(obj);
						 var str2=JSON.stringify(arr2);
						localStorage.setItem(getCookie("phone"),str2);
					}
				}
			}
			
			
//			获取id与name函数
			 function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
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