//dom对象
var dom = {
	user: document.getElementById('user'),
	pass: document.getElementById('pass'),
	level: document.getElementById('level'),
	levelspan: level.querySelectorAll('span'),
	btn: document.getElementById('btn'),
	tip:document.querySelectorAll('.tip'),
	phone:document.getElementById('phone'),
	email:document.getElementById('email'),
	captcha:document.getElementById('captcha'),
	changecaptcha:document.getElementById('changecaptcha'),
	register:document.getElementById('register'),
	inputcaptcha:document.getElementById('inputcaptcha')
}
//信息状态
var state = {
	user:false,
	pass:false,
	phone:false,
	email:false,
	captcha:''
}
//获取验证码
function cpatcha(){
	var captcha = dom.captcha
	$.ajax({
		type:"post",
		url:"http://localhost:52013/sendcaptcha",
		success:function(data){
			captcha.innerHTML = data.data;
			state.captcha = data.text;
		}
	});
}
//账号验证
dom.user.onblur = function() {
	dom.tip[0].style.visibility = 'visible';
	var vuser = dom.user.value;
	$.ajax({
		type: "post",
		url: "http://localhost:52013/username",
		data: {
			username: vuser
		},
		success: function(data) {
			var reg = /^[a-z]\w{5,17}$/;
			if(data != false) {
				dom.tip[0].innerHTML = '此账号已注册请登录';
			} else {
				if(!reg.test(vuser)) {
					dom.tip[0].innerHTML = '请输入正确格式'
				} else {
					dom.tip[0].innerHTML = '恭喜您此账号可注册'
					state.user = true;
				}
			}
		}
	});
}
//密码验证
dom.pass.onblur = function() {
	var vpass = dom.pass.value;
	var passstatu = false;
	var reg1 = /^\w{6,16}$/;
	var reg2 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
	var reg3 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
	if(reg1.test(vpass)){
		state.pass = true;
	}
	for(var i = 0; i < dom.levelspan.length; i++) {
		dom.levelspan[i].className = '';
		if(reg3.test(vpass)){
			dom.levelspan[2].className = 'light'
		}else{
			if(reg2.test(vpass)){
				dom.levelspan[1].className = 'light'
			}else{
				dom.levelspan[0].className = 'light'
			}
		}
	}
}
//手机验证
dom.phone.onblur = function() {
	dom.tip[1].style.visibility = 'visible';
	var vphone = dom.phone.value;
	$.ajax({
		type: "post",
		url: "http://localhost:52013/username",
		data: {
			phone: vphone
		},
		success: function(data) {
			var reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
			if(data != false) {
				dom.tip[1].innerHTML = '此手机号已使用请登录';
			} else {
				if(!reg.test(vphone)) {
					dom.tip[1].innerHTML = '请输入正确手机号'
				} else {
					dom.tip[1].innerHTML = '恭喜您此手机可使用'
					state.phone = true;
				}
			}
		}
	});
}
//邮箱验证
dom.email.onblur = function() {
	dom.tip[2].style.visibility = 'visible';
	var vemail = dom.email.value;
	$.ajax({
		type: "post",
		url: "http://localhost:52013/username",
		data: {
			phone: vemail
		},
		success: function(data) {
			var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(data != false) {
				dom.tip[2].innerHTML = '此邮箱已使用请登录';
			} else {
				if(!reg.test(vemail)) {
					dom.tip[2].innerHTML = '请输入正确邮箱'
				} else {
					dom.tip[2].innerHTML = '恭喜您此邮箱可使用'
					state.email = true;
				}
			}
		}
	});
}
//加载验证码
window.onload = cpatcha();
//重置验证码
dom.changecaptcha.onclick = function(){
	cpatcha();
}
//注册
dom.register.onclick = function(){
	var inputcaptcha = dom.inputcaptcha.value;
	switch (true){
		case !state.user:
			alert('请输入正确账号')
			break;
		case !state.pass:
			alert('请输入正确密码')
			break;
		case !state.phone:
			alert('请输入正确手机')
			break;
		case !state.email:
			alert('请输入正确邮箱')
			break;
		case inputcaptcha!=state.captcha:
			alert('请输入正确验证码')
			break;
		default:
			$.ajax({
				type:"post",
				url:"http://localhost:52013/user",
				data:{
					user:dom.user.value,
					key:dom.pass.value,
					email:dom.email.value,
					phone:dom.phone.value,
					head:null
				},
				success:function(data){
					alert('注册成功')
					window.location.href='login.html';
				}
			});
			break;
	}
}
