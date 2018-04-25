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
//淡入淡出轮播
function Slider() {
    this.lunbo = document.getElementById("lunbo");
    this.li = this.lunbo.getElementsByTagName("li");
    this.up = document.getElementById("up");
    this.down = document.getElementById("down");
    this.dian = document.getElementById("dian");
    this.inow = 0;
    this.next = 0;
    this.timer = null;
    var _this = this;
    this.down.onclick = function() {
        if (_this.next == _this.li.length - 1) {
            _this.next = 0;
        } else {
            _this.next++;
        }
        _this.toImg();
    }
    this.up.onclick = function() {
        if (_this.next == 0) {
            _this.next = _this.li.length - 1;
        } else {
            _this.next--;
        }
        _this.toImg();
    }
    this.lunbo.onmousemove = function() {
        clearInterval(_this.timer);
    }
    this.lunbo.onmouseout = function() {
        _this.Autoplay();
    }
    this.timer = setInterval(function() {
        _this.Autoplay()
    }, 2500)
}
Slider.prototype.Autoplay = function() {
    if (this.next == this.li.length - 1) {
        this.next = 0;
    } else {
        this.next++
    }
    this.toImg();
}
Slider.prototype.toImg = function() {
    move(this.li[this.inow], { "opacity": 0 });
    move(this.li[this.next], { "opacity": 100 })
    this.inow = this.next;
}
//ajax("post", "../script/json/data.json", "", function(data) {
//  var str = "";
//  var content = document.getElementById("content");
//  var a = getCookie("init");
//  var data = data.star;
//  for (var i = 0; i < data.length; i++) {
//      if (a == data[i].id) {
//          str = '<div class="iwidth"><div id="show"><ul id="lunbo"></ul><div id="up"><i class="iconfont icon-arrow1-copy"></i></div><div id="down"><i class="iconfont icon-arrow1-copy"></i></div><div id="dian"></div></div><div id="choose"><h1>' + data[i].title + '</h1><p class="word"><span>' + data[i].word1 + '</span>' + data[i].word2 + '</p><p class="price"></p><ul id="gift"></ul><div class="address"><div class="add1"><div class="add2"><span>北京</span><span>朝阳区</span><span>奥运村街道</span> <a href="##">修改</a></div><p>有现货</p></div></div><h4>选择版本</h4><ul id="version"></ul><h4>选择颜色</h4><ul id="color"></ul><h4>选择小米提供的意外保险<a href="">了解意外保险 ></a></h4><ul class="safe"><li class="check"><input type="checkbox" name="" id="check" value="" /></li><li class="img1"><img src="../img/safe.jpg"/></li><li><p class="name"> 手机意外保险 </p><p>小米MIX 2 意外保险</p></li><span class="dollor">  249元  </span></ul><ul class="total"><li id="totalname"></li><li id="totlePrice"></li></ul><a href="shopcar.html" id="GWC">加入购物车</a></div><div>';
//          var c = data[i].title;
//      }
//  }
//  content.innerHTML = str;
//
//  function Change() {
//      this.version = document.getElementById("version");
//      var str = '';
//      for (var i = 0; i < data.length; i++) {
//          if (data[i].id == a) {
//              this.data = data[i].version;
//          }
//      }
//      for (var i = 0; i < this.data.length; i++) {
//          str += '<li class="versionchoose" data-id="' + i + '"><i class="left1">' + this.data[i].name + '</i><i class="right1">' + this.data[i].price + '</i></li>'
//      }
//      this.version.innerHTML = str;
//  }
//  new Change();
//
//  function Choose() {
//      this.lunbo = document.getElementById("lunbo");
//      this.gift = document.getElementById("gift");
//      this.color = document.getElementById("color");
//      this.totalname = document.getElementById("totalname")
//      this.totlePrice = document.getElementById("totlePrice")
//      this.left1 = document.querySelectorAll(".left1")
//      this.right1 = document.querySelectorAll(".right1")
//      this.check = document.getElementById("check")
//      this.total = document.getElementById("total")
//      this.safe = document.querySelector(".safe")
//      this.GWC = document.getElementById("GWC");
//      var _this = this;
//      var str = ''
//      var str1 = ''
//      this.vc = document.querySelectorAll(".versionchoose")
//      for (var i = 0; i < data.length; i++) {
//          if (data[i].id == a) {
//              this.data = data[i].version;
//              this.color1 = data[i].color;
//          }
//      }
//      var pic = this.color1[0].img[0]
//      var y = this.color1[0].name;
//      var t = c + _this.left1[0].innerHTML + y;
//      this.totalname.innerHTML = c + _this.left1[0].innerHTML + y + '<span>' + parseInt(this.right1[0].innerHTML) + '元</span>';
//      this.totlePrice.innerHTML = '总计：' + parseInt(_this.right1[0].innerHTML) + '元';
//      var p = parseInt(_this.right1[0].innerHTML);
//      console.log(y, t)
//      for (var i in this.color1) {
//          str1 += '<li class="colors" data-id="' + i + '"><i style="background:' + this.color1[i].rgb + '"></i>' + this.color1[i].name + '</li>';
//      }
//      this.color.innerHTML = str1;
//      this.colors = document.querySelectorAll(".colors")
//      var arr1 = this.color1[0].img;
//      for (var i in arr1) {
//          str += '<li><img src="' + arr1[i] + '" alt="" /></li>'
//      }
//      this.lunbo.innerHTML = str;
//
//      var arr2 = this.data[0].gift;
//      for (var i in arr2) {
//          this.gift.innerHTML += arr2[i];
//      }
//      for (var i = 0; i < this.vc.length; i++) {
//          this.vc[0].className = "line"
//          this.vc[i].onclick = function() {
//              _this.gift.innerHTML = '';
//              var b = this.getAttribute('data-id');
//              for (var j = 0; j < _this.vc.length; j++) {
//                  _this.vc[j].className = "versionchoose";
//              }
//              this.className = "line";
//              _this.totalname.innerHTML = c + _this.left1[b].innerHTML + y + '<span>' + parseInt(_this.right1[b].innerHTML) + '元</span>';
//              _this.totlePrice.innerHTML = '总计：' + parseInt(_this.right1[b].innerHTML) + '元';
//              t = c + _this.left1[b].innerHTML + y;
//              p = parseInt(_this.right1[b].innerHTML);
//              for (var i = 0; i < data.length; i++) {
//                  if (data[i].id == a) {
//                      this.data = data[i].version;
//                  }
//              }
//              var arr2 = this.data[b].gift;
//              for (var i in arr2) {
//                  _this.gift.innerHTML += arr2[i];
//              }
//          }
//      }
//      for (var i = 0; i < this.colors.length; i++) {
//          this.colors[0].className = "line";
//          this.colors[i].onclick = function() {
//              str = '';
//              var b = this.getAttribute('data-id');
//              for (var j = 0; j < _this.colors.length; j++) {
//                  _this.colors[j].className = "colors";
//              }
//              this.className = "line";
//              y = _this.color1[b].name;
//              pic = _this.color1[b].img[0];
//              var arr = _this.color1[b].img;
//              _this.totalname.innerHTML = c + _this.left1[b].innerHTML + y + '<span>' + parseInt(_this.right1[b].innerHTML) + '元</span>';
//              t = c + _this.left1[b].innerHTML + y;
//              for (var i in arr) {
//                  str += '<li><img src="' + arr[i] + '" alt="" /></li>'
//              }
//              _this.lunbo.innerHTML = str;
//          }
//      }
//      this.obj = {};
//      var id = "id";
//      var name = "name";
//      var price = "price";
//      var num = "num";
//      var n = 1;
//      var images = "images";
//      this.GWC.onclick = function() {
//          if (getCookie("shop")) {
//              var shop = JSON.parse(getCookie("shop"))
//              for (var i in shop) {
//                  var stop = false;
//                  if (shop[i].name == t) {
//                      stop = true;
//                      var c = i;
//                      break;
//                  }
//              }
//              if (stop) {
//                  shop[c].num++;
//                  setCookie("shop", JSON.stringify(shop), 7)
//              } else {
//                  _this.obj[id] = a;
//                  _this.obj[name] = t;
//                  _this.obj[price] = p;
//                  _this.obj[num] = n;
//                  _this.obj[images] = pic;
//                  shop.push(_this.obj)
//                  setCookie("shop", JSON.stringify(shop), 7)
//              }
//          } else {
//              this.shop = [];
//              _this.obj[id] = a;
//              _this.obj[name] = t;
//              _this.obj[price] = p;
//              _this.obj[num] = n;
//              _this.obj[images] = pic;
//              this.shop.push(_this.obj)
//              setCookie("shop", JSON.stringify(this.shop), 7)
//          }
//      }
//  }
//  new Choose();
//  new Slider();
//})

//头部
function chead(){
	var p = new Promise(function(resolve, reject){ 
        $.ajax({
        	type:'post',
        	url:'http://localhost:52013/goods',
        	data:{
        		id:'1'
        	},
        	success:function(data){
        		var str = '';
        		str ='<h1>' + data[0].goods_name + '</h1><p class="word"><span>' + data[0].goods_state + '</span>' + data[0].goods_word + '</p><p class="price">'+data[0].goods_price+'</p>'
        		var choose = document.getElementById('choose')
        		var chead = document.createElement('div')
        		chead.innerHTML = str
        		choose.appendChild(chead)
        	}
        	
        })
    });
    return p;
}
//礼物
function cgift(){
	var p = new Promise(function(resolve, reject){
		$.ajax({
			type:"post",
			url:"http://localhost:52013/goods/gift",
			data:{
				id:'1'
			},
			success:function(data){
				var str = ''
				for(i in data){
					str += '<li><span>赠品</span>'+data[i].version_gift+'</li>'
				}
				var cgift = document.createElement('ul');
				cgift.setAttribute('id','gift')
				cgift.innerHTML = str;
				choose.appendChild(cgift)
				cmap()
			}
		});
		
	});
	return p;
}
//地图
function cmap(){
	var str = '<div class="add1"><div class="add2"><span>北京</span><span>朝阳区</span><span>奥运村街道</span> <a href="javascript;:" id="addchange">修改</a></div><p>有现货</p></div>';
	var add = document.createElement('div');
	add.setAttribute('id','address')
	add.innerHTML = str;
	choose.appendChild(add)
	var addchange = document.getElementById('addchange')

}

var obj = {
	province:null,
	city:null,
	area:null,
	provinceid:'',
	cityid:''
}

//获取省信息
function province(){
	$.ajax({
		type:"post",
		url:"http://localhost:52013/province",
		success:function(data){
			console.log(obj.province)
			obj.province = data	
		}
	});
}

//获取市信息
function city(provinceid){
	$.ajax({
		type:"post",
		url:"http://localhost:52013/city",
		data:{
			provice:provinceid
		},
		success:function(data){
			obj.city = data;
		}
	});
}

//获取区信息
function area(cityid){
	$.ajax({
		type:"post",
		url:"http://localhost:52013/area",
		data:{
			city:cityid
		},
		success:function(data){
			obj.area = data;
		}
	});
}


chead()
.then(cgift())
.then()
