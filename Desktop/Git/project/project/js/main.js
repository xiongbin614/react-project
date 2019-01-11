requirejs.config({//配制方法，主要用户模块的依赖注入和重命名
	paths:{//模块路径
		"jquery":"jquery",
		"nav":"nav",
		"productClassify":"productClassify",
		"register":"register",
		"login":"login",
		"myCart":"myCart"
	}
});
requirejs(["jquery","nav","productClassify","register","login","myCart"],function($,nav,get,reg,login,cart){
		nav.top($);
		nav.nav($);
		nav.topclick($);
		nav.banner($);
		get.getLocation($);
		get.addCart($);
		reg.register($);
		login.login($);
//		var obj = login.login($).init();

		cart.showGoods($);
		cart.oneDel($);
		
})
