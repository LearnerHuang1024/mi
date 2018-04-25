//明星推荐数据
$.ajax({
    type: 'post',
    url: 'http://localhost:52013/goods',
    data: {
        type: 'star'
    },
    success: function(data) {
        var str = "";
        var $ul = $("#star_ul");
        $.each(data, function(i, val) {
            str += '<li class="l' + (i + 1) + '"><a href="detailed.html" class="aa" data-id=' + data[i].goods_id + '></a><img src="../' + data[i].goods_img + '"/><p>' + data[i].goods_name + '</p><p class="w1">' + data[i].goods_point + '</p><p class="w2">' + data[i].goods_price + '</p></li>';
        })
        $ul.html(str);
        new Star();
    }
})
var mySwiper = new Swiper("#swiper1", {
    autoplay: 5000,
    loop: true,
    effect: "fade",
    pagination: '.swiper-pagination',
    paginationClickable: true,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    noSwipingClass: 'swiper-slide',
    noSwiping: true,
});

function Star() {
    this.star = document.getElementById("star");
    this.left = document.getElementById("star_left");
    this.right = document.getElementById("star_right");
    this.ul = document.getElementById("star_ul");
    this.li = document.querySelectorAll("li");
    this.ul.style.width = (this.li[0].offsetWidth + 14) * this.li.length + "px";
    this.timer = null;
    var _this = this;
    this.right.onclick = function() {
        _this.ul.style.left = -1240 + "px";
        _this.right.style.color = "#e0e0e0";
        _this.left.style.color = "#b0b0b0";
        _this.right.cursor = "default";
        _this.left.cursor = "pointer";
    }
    this.left.onclick = function() {
        _this.ul.style.left = 0;
        _this.left.style.color = "#e0e0e0";
        _this.right.style.color = "#b0b0b0";
        _this.left.cursor = "default";
        _this.right.cursor = "pointer";
    }
    this.star.onmousemove = function() {
        clearInterval(_this.timer)
    }
    this.star.onmouseout = function() {
        _this.timer = setInterval(function() {
            _this.autoplay();
        }, 5000)
    }
    this.timer = setInterval(function() {
        _this.autoplay();
    }, 5000)
}
Star.prototype.autoplay = function() {
    if (this.ul.offsetLeft == -14) {
        this.ul.style.left = -1240 + "px";
        this.right.style.color = "#e0e0e0";
        this.left.style.color = "#b0b0b0";
    } else if (this.ul.offsetLeft == -1254) {
        this.ul.style.left = 0;
        this.left.style.color = "#e0e0e0";
        this.right.style.color = "#b0b0b0";
    }
}

document.onclick = function(){
	var e = e||event;
	var target = e.target || e.srcElement;
	if(target.getAttribute("data-id")){
		var good = target.getAttribute("data-id");
		$.cookie('init',good,{expires: 0 ,path:'/'})
	}
}


window.onload = function(){
	var logined = document.querySelector('.logined');
	var login = document.querySelector('.login');
	var user = document.getElementById('user');
	if($.cookie('user')){
		var data = JSON.parse($.cookie('user'));
		login.style.display = 'none';
		logined.style.display = 'block';
		user.innerHTML = '<p id="username">'+data[0].u_username+'</p><ul id="userlist"><li id="userinfo">用户中心</li><li id="myorder">我的订单</li><li id="leave">退出登录</li></ul>'
		new Leave();
	}
	
}
function Leave(){
	var leave = document.getElementById('leave');
	console.log(leave)
	leave.onclick = function(){
		$.cookie('user','', { expires: -1 ,path:'/'});
		location.reload();
	}
}


