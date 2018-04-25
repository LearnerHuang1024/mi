function Show(){
	this.Signin = document.getElementById("Signin");
	this.QRcode = document.getElementById("QRcode");
	this.Signinshow = document.getElementById("Signinshow");
	this.QRcodeshow = document.getElementById("QRcodeshow");
	this.mobile1 = document.getElementById("mobile1");
	this.mobile2 = document.getElementById("mobile2");
	this.mobile1show = document.getElementById("mobile1show");
	var _this = this;
	this.Signin.onclick = function(){
		_this.Signin.style.color = "#ff6700";
		_this.Signinshow.style.display = "block";
		_this.QRcode.style.color = "#666";
		_this.QRcodeshow.style.display = "none";
		_this.mobile1show.style.display = "none";
	}
	this.QRcode.onclick = function(){
		_this.Signin.style.color = "#666";
		_this.Signinshow.style.display = "none";
		_this.QRcode.style.color = "#ff6700";
		_this.QRcodeshow.style.display = "block";
		_this.mobile1show.style.display = "none";
	}
	this.mobile1.onclick = function(){
		_this.Signinshow.style.display = "none";
		_this.QRcodeshow.style.display = "none";
		_this.mobile1show.style.display = "block";
	}
	this.mobile2.onclick = function(){
		_this.Signin.style.color = "#ff6700";
		_this.Signinshow.style.display = "block";
		_this.QRcode.style.color = "#666";
		_this.QRcodeshow.style.display = "none";
		_this.mobile1show.style.display = "none";
	}
}
new Show();
new login();
function login(){
	this.login = document.getElementById('login_a');
	this.user = document.getElementById('user');
	this.pass = document.getElementById('pass');
	
	var self = this;
	this.login.onclick = function(){
		if(self.user.value==''){
			alert("请输入账号")
		}else{
			$.ajax({
				type:"post",
				url:"http://localhost:52013/account",
				data:{
					account:self.user.value
				},
				success:function(data){
					switch (true){
						case !data:
							alert('此账号不存在');
							break;
						case self.pass.value!=data[0].u_password:
							alert('密码错误');
							break;
						default:
							$.cookie('user',JSON.stringify(data),{
								expires:7,
								path:"/"
							})
							window.location.href = 'index.html'
							break;
					}
				}
			});	
		}
	}
}

