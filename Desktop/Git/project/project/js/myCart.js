define(function(){
	return{
		
//		删除单个商品列
		oneDel:function($){
			delOne();//删除单个商品
//			allDel();
			function delOne(){
					$(".delGoods span").click(function(){
						if($(this).parent().parent().parent().find(".oneCheaked").prop("checked")){
						$(this).parent().parent().parent().remove();
						}			
			})
			}
			


		
		},
//		渲染购物车
		showGoods:function($){
			addGoods( );//渲染购物车数据
			addNums();
			allSelect();
			function addGoods(){
					$.ajax({
							type:"get",
							url:"json/json3.json",
							async:true,
							success:function(res){
							var phone=getCookie("phone");
							var obj=localStorage.valueOf();//所有localStorage数据	
							var str='';
							for(var i in obj){
										if(phone==i){
										var arr=JSON.parse(obj[i]);//[{"id":"1540895551625","nums":2},{"id":"1545877507789","nums":2}]
										for(var j=0;j<arr.length;j++){
											for(var k=0;k<res.length;k++){res[0].data
												for(var n=0;n<res[k].data.length;n++){
													if(arr[j].id==res[k].data[n].id){
//														console.log(res[k].data[n].id));
														console.log(res[k].data[n].id);
														
//														渲染购物车
														var div=document.createElement("div");
														div.className="oneGoods";
														div.innerHTML=showCart(str,res[k].data[n].img,res[k].data[n].name,res[k].data[n].price,arr[j].nums,res[k].data[n].id);
														$(".cartMainCenter").append(div);
														
														delOne();
//														addNums(res[k].data[n].id);//传入加减里面的index
//								addNums();//传入加减里面的index
//														getStarge();
													
													}
												}
											}
										}
										
										}
								}
								addNums();//传入加减里面的index
//								allDel();//删除全选
								allSelect();
								select();
								del()
							
							}
						});
				
			}
//			删除单个商品例
		function delOne(){
					$(".delGoods span").click(function(){
						if($(this).parent().parent().parent().find(".oneCheaked").prop("checked")){
						$(this).parent().parent().parent().remove();
						var id=$(this).parent().parent().find(".adcGoods").attr("index");
						delShop(id)
						}			
			})
			}
//			增减数量
		function addNums(){
//			result();
//			添加数量
			$(".addGoods").click(function(){
				result();
				
				var index=$(this).parent().parent().find("input").val();
				index++;
				$(this).parent().parent().find("input").attr("value",index);
				
				var a=$(this).attr("index");
				getStarge(a);
			});
//			减少数量
			$(".adcGoods").click(function(){
				result();
				var index=$(this).parent().parent().find("input").val();
				if(index==1){
//					$(this).css("cursor","Move");
					return;
				}
				index--;
				$(this).parent().parent().find("input").attr("value",index);
				var a=$(this).attr("index");
				getStargeAdc(a)
			});
		}
//		删除商品列,包括localstar
		function delShop(id){
			var stage= localStorage.getItem(getCookie("phone"))//获取对应用户名下的值
			var Arr=JSON.parse(stage);
//			console.log(id);
			
			for (var i = 0; i < Arr.length; i++) {
				if(Arr[i].id==id){
					Arr.splice(i,1) ;  
				}	
			}
				console.log(Arr);
				if(Arr[0]==undefined){
					localStorage.clear();
				}else{
					var str=JSON.stringify(Arr);
				localStorage.setItem(getCookie("phone"),str);
				}
				
				
		}
		
//		获取localstarge里面的值//数量加加
		function getStarge(id){//1540895551625
			var stage= localStorage.getItem(getCookie("phone"))//获取对应用户名下的值
			var Arr=JSON.parse(stage);
			var obj={};
			for (var i = 0; i < Arr.length; i++) {
				if(Arr[i].id==id){
					Arr[i].nums++;
					obj.id=Arr[i].id;
					obj.nums=Arr[i].nums;
					Arr.splice($.inArray(Arr[i],Arr),1);//修改
//					Arr.splice(i,1);//修改
				}	
			}
			Arr.push(obj);
			var str=JSON.stringify(Arr);
			localStorage.setItem(getCookie("phone"),str)
			
		}
//		获取localstarge里面的值//数量减减
		function getStargeAdc(id){//1540895551625
			var stage= localStorage.getItem(getCookie("phone"))//获取对应用户名下的值
			var Arr=JSON.parse(stage);
			var obj={};
			for (var i = 0; i < Arr.length; i++) {
				if(Arr[i].id==id){
					if(Arr[i].nums==1){
						return;
					}
					Arr[i].nums--;
					obj.id=Arr[i].id;
					obj.nums=Arr[i].nums;
					Arr.splice($.inArray(Arr[i],Arr),1);
				}	
			}
			Arr.push(obj);
			var str=JSON.stringify(Arr);
			localStorage.setItem(getCookie("phone"),str)
			
		}
		

//			全选完结
			function allSelect(){
				$(".cartTitle label input").click(function(e){
					result();
					e.stopPropagation();
					if($(this).prop("checked")){//选中
						for (var i = 0; i < $(".oneCheaked").length; i++) {
							$(".oneCheaked").eq(i).prop("checked",true);
							$(".cartDelL input").prop("checked",true);
						}
					}else{//没选中
						for (var i = 0; i < $(".oneCheaked").length; i++) {
							$(".oneCheaked").eq(i).prop("checked",false);
							$(".cartDelL input").prop("checked",false);
							
						}
					}

				})
				$(".cartDelL label input").click(function(e){
					result();
					
					e.stopPropagation();
					if($(this).prop("checked")){//选中
						for (var i = 0; i < $(".oneCheaked").length; i++) {
							$(".oneCheaked").eq(i).prop("checked",true);
							$(".cartTitle input").prop("checked",true);
						}
					}else{//没选中
						for (var i = 0; i < $(".oneCheaked").length; i++) {
							$(".oneCheaked").eq(i).prop("checked",false);
							$(".cartTitle input").prop("checked",false);
							
						}

						
					}

				})
				

				
			}//完结
			function select(){//单个商品改变全选
				
						var flag=false;
					for (var i = 0; i < $(".oneCheaked").length; i++) {
					 $(".oneCheaked").eq(i).click(function(){//触发已选商品件数
					 	result();
//					 	console.log($(this).html())
					 	for(var j=0;j<$(".oneCheaked").length;j++){
					 		
					 		if( !$(".oneCheaked").eq(j).prop("checked")){//有一个没选
					 			flag=true;
					}
					 	}
					 	if(flag){
					 		$(".cartTitle input").prop("checked",false);
							$(".cartDelL input").prop("checked",false);
							flag=false;
							
					 	}else{
					 		$(".cartTitle input").prop("checked",true);
							$(".cartDelL input").prop("checked",true);

					 	}
					 	
					 })
				}
			}
			
			
			function result(){//结算函数
				var num=0;
				var sum=0;
				for (let i = 0; i < $(".oneCheaked").length; i++) {
					if($(".oneCheaked").eq(i).prop("checked")){
//						alert($(".oneCheaked").eq(i).attr("type"))
						num+=Number($(".oneCheaked").eq(i).parent().find("ul input[type='text']").val());	
//						console.log($(this).html());
//						num+=Number($(this).parent().find("ul input[type='text']").val());
//						num+=1;
//						sum+=Number($(".oneCheaked").eq(i).parent().find("ul li:nth-child(2) span").html());
					}
//					if($(".cartTitle input").prop("checked")){
//						num=i;
//					}
				}
//				console.log(num);
//				console.log(sum);
				$(".cartDelC p:last-child span").html(num);
//				$(".prices").html(sum);
			}
//			全删除
			function del(){
				$(".cartDelL a").click(function(){
				for (let i = 0; i < $(".oneCheaked").length; i++) {
					if($(".oneCheaked").eq(i).prop("checked")){
						$(".oneCheaked").eq(i).parent().remove();
					}
					
					}
				})
			}

//			购物车渲染函数
			function showCart(str ,img,name,price,nums,id){
				str=`
					<input type="checkbox" class="oneCheaked"  />
						<a href=""><img src="${img}" width="100px"/></a>
						<ul>
							<li>
								<a href="">${name}</a>
							</li>
							<li>
								<span>${price}</span>
							</li>
							<li>
								<div class="cartNums">
									<input type="text" name="" id="" value="${nums}" />
									<div class="cartBtn">
										<span class="addGoods" index="${id}" >+</span>
										<span class="adcGoods" index="${id}">-</span>
									</div>
								</div>
							</li>
							<li>¥ 4197.00</li>
							<li class="delGoods"><span>删除</span></li>
						</ul>
			
				`;
				return str;	
			}//
			//
			
			
			
// 想要获取的cook键值
		function getCookie(cookie_name) {
				        var allcookies = document.cookie;
				        var cookie_pos = allcookies.indexOf(cookie_name);
				        if (cookie_pos != -1) {
				            cookie_pos = cookie_pos + cookie_name.length + 1; 
				            var cookie_end = allcookies.indexOf(";", cookie_pos);
				            if (cookie_end == -1) {
				                cookie_end = allcookies.length;
				            }
				            var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
				        }
				        return value;
				   }
		//
		}
	}
})