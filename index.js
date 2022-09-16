window.onload = function() {
	
	var index = 1;
	var timer = null;
	var flag = true;
	
	var length = $(".header_slider .box li").css("width");
	$(".header_slider .wrap .box").css("left", "-"+length);
	// 图片自动轮播的动画 (向左)
	function autoChangeAnimeL() {
		var length = $(".header_slider .box li").css("width");
		$(".header_slider .box").animate({
			left: '-='+length
		}, 1500, function(){
			flag = true;
		});
	}
	
	
	// 图片自动轮播的动画 (向右)
	function autoChangeAnimeR() {
		var length = $(".header_slider .box li").css("width");
		$(".header_slider .box").animate({
			left: '+='+length
		}, 1500, function(){
			flag = true;
		});
	}
	
	// 自动播放函数
	// 这里判断自动轮播是否到了最后一张？
	// 如果到了，就清除定时器，重制图片位置，并开启下一轮轮播
	function autoPlay() {
		var length = $(".header_slider .box li").css("width");
		timer = setInterval(function() {
			index++;
			if(index > 4){ // 到了最后一张(第一张的副本)
				$(".header_slider .box").css("left", "-"+length);
				index = 2;
			}
			autoChangeAnimeL();
		}, 3500)
	}
	
	// 点击左边按钮 图片向左切换（此期间需关闭定时器）
	$(".change_btn .btn_left").click(function() {
		if(flag){
			flag = false;
			clearInterval(timer);
			index++;
			// 当从第4张（也就是看起来的最后一张）切换到第五张（也就是第一张的副本）时，设置css样式（index
			// 如果到了最后一张（第一张的副本）
			if(index > 4){
				$(".box").css("left", "-"+length);
				index = 2;
			}
			autoChangeAnimeL();
			autoPlay();
		}
	})
	
	// 点击右边按钮 图片向右切换（此期间需关闭定时器）
	$(".change_btn .btn_right").click(function() {
		if(flag){
			flag = false;
			clearInterval(timer);
			index--;
			
			if(index < 0){
				$(".box").css("left", "-"+(3*parseInt(length))+"px");
				index = 2;
			}
			autoChangeAnimeR();
			autoPlay();
		}
	})
	
	// 鼠标位于图片上方 轮播停止
	$(".header_slider .wrap li").mouseover(() => {
		clearInterval(timer);
	})
	
	$(".change_btn .btn_left").mouseover(() => {
		clearInterval(timer);
	})
	
	$(".change_btn .btn_right").mouseover(() => {
		clearInterval(timer);
	})
	
	// 鼠标离开图片 轮播开始
	$(".header_slider .wrap li").mouseout(() => {
		autoPlay();
	})
	
	autoPlay();
	
	// 绑定 顶部下方nav是否隐藏 鼠标滚轮事件
	$(window).bind("scroll", function(){ 
		let top = $(this).scrollTop(); // 当前窗口的滚动距离
		let flag = true;
		if(top >= 450){
			$(".nav_wrap").removeClass("visible");
		}else{
			$(".nav_wrap").addClass("visible");
		}
	  });
	
	// 绑定右下角回到顶部是否出现的鼠标滚轮事件
	$(window).bind("scroll", function(){ 
		let top = $(this).scrollTop(); // 当前窗口的滚动距离
		let flag = true;
		if(flag){
			flag = false;
			if(top >= 50){
				$(".go_top").animate({
					opacity: 1
				}, 10, function(){
					flag = true
				})
			}else{
				$(".go_top").animate({
					opacity: 0
				}, 10, function(){
					flag = true;
				})
			}
		}// 临界值选为70
	  });
	
	// 封装添加删除 active 
	function hasActive(elment) {
		if($(elment).children("a").hasClass("active")){
			$(elment).children("a").removeClass("active");
		}else{
			$(elment).children("a").addClass("active");
		}
	}
	
	// 右上角购物车按钮鼠标划过变色并显示购物板
	$(".nav_top .cart").hover(function() {
		hasActive(".nav_top .cart");
		$(".cart_panel").slideToggle("slow");
	});
	
	// "全部商品" 划过变色并显示二级菜单
	$(".nav_bottom .all_wares").hover(function() {
		hasActive(".nav_bottom .all_wares");
		$(".wares_list").slideToggle("slow");
	})
	
	// 划过二级菜单显示三级菜单
	$(".wares_list li").hover(function() {
		$(this).children("ul").slideToggle("slow");
	})
	
	// 右上角搜索框获得焦点事件
	$(".search .text").focus(function() {
		$(this).addClass("focus");
		$(".search .keyword").css("display", "none");
	});
	
	// 右上角搜索框失去焦点事件
	$(".search .text").blur(function() {
		$(this).removeClass("focus");
		$(".search .keyword").css("display", "block");
	})
	
	// 右侧悬浮栏图标鼠标悬浮弹出tip框
	$(".fixed_bar dd").hover(function() {
		$(this).children(".tips").css("display", "block").animate({
			opacity:'1',
			left: '-86px'
		}, 200)
	}, function() {
		$(this).children(".tips").animate({
			opacity:'0',
			left: '-128px'
		}, 200, function() {
			$(this).css("display", "none");
		})
	})
	
	// 右侧悬浮栏中购物车一块悬浮变色
	$(".cart_tip").hover(function() {
		if($(this).children("span").hasClass("active")){
			$(this).children("span").removeClass("active");
		}else{
			$(this).children("span").addClass("active");
		}
	});
	
	// 点击右下角回到顶部
	$('.go_top').click(function(){
		$('html,body').animate({
			scrollTop:0,
		},'slow');
	});
	
	// 鼠标划过完美世界周边商品区爱心变红
	$(".list .like").hover(function() {
		$(this).children("i").attr("class","iconfont icon-icon-test57");
	}, function() {
		$(this).children("i").attr("class","iconfont icon-icon-test56");
	});
	
	// 鼠标划过完美世界周边商品区加入购物车出现
	$(".main .list").hover(function() {
		$(this).children(".add").animate({
			bottom: 0
		}, 200)
	}, function() {
		$(this).children(".add").animate({
			bottom: '-90px'
		}, 200)
	});
	
	// 五星好评jq实现（思路一）
	$(".add li").hover(function() {
		
		$(this).children("i").attr("class","iconfont icon-icon-test58");
		$(this).children("i").attr("class", "iconfont icon-icon-test59");
		$(this).prevAll().children("i").attr("class", "iconfont icon-icon-test59");
	}, function() {
		// console.log("我出去了");
		$(this).children("i").attr("class","iconfont icon-icon-test58");
		$(this).prevAll().children("i").attr("class", "iconfont icon-icon-test58");
	})
}