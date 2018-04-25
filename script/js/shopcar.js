ajax("post","../js/data.json","",function(data){
	var data = data.star;
	var str = '';
	var goods = document.getElementById("goods")
	var empty = document.getElementById("empty")
	var cent = document.getElementById("cent")
	if(getCookie("shop")){
		empty.style.display = "none";
		goods.style.display = "block";
		var arr=JSON.parse(getCookie("shop"))
		for(var i in arr){
			for(var j in data){
				if(arr[i].id==data[j].id){
					str += '<ul><li class="check1"><input type="checkbox" name="" id="" class="check" value="" /></li><li class="img"><img src="'+arr[i].images+'"/></li><li class="name">'+arr[i].name+'</li><li class="price">'+arr[i].price+'</li><li class="num"><span><a href="##" class="sub" data-id="'+i+'">-</a><input type="text" name="" id="number" value="'+arr[i].num+'" /><a href="##" class="add" data-id="'+i+'">+</a></li></span><li class="total">'+arr[i].price*arr[i].num+'元</li><li class="del"><a href="##" class="dele" data-id="'+i+'">x</a></li></ul>'
				}
			}
		}
		cent.innerHTML = str;
		new Add();
		new Sub();
		new Del();
		new Check();
	}else{
		empty.style.display = "block";
		goods.style.display = "none";
	}
})
function Add(){
	this.add = document.querySelectorAll(".add");
	for(var i = 0;i<this.add.length;i++){
		this.add[i].onclick = function(){
			var x = this.getAttribute("data-id")
			var arr=JSON.parse(getCookie("shop"))
			var num = Number(this.previousElementSibling.value);
			num++;
			this.previousElementSibling.value = num;
			this.parentNode.parentNode.nextElementSibling.innerHTML = arr[x].price*num+'元'
			arr[x].num = num;
			setCookie("shop",JSON.stringify(arr),7)
		}
	}
}
function Sub(){
	this.sub = document.querySelectorAll(".sub");
	for(var i = 0;i<this.sub.length;i++){
		this.sub[i].onclick = function(){
			var x = this.getAttribute("data-id")
			var arr=JSON.parse(getCookie("shop"))
			var num = Number(this.nextElementSibling.value);
			if(num<2){
				num=1
			}else{
				num--;
			}
			this.nextElementSibling.value = num;
			this.parentNode.parentNode.nextElementSibling.innerHTML = arr[x].price*num+'元'
			arr[x].num = num;
			setCookie("shop",JSON.stringify(arr),7)
		}
	}
}
function Del(){
	this.dele = document.querySelectorAll(".dele")
	for(var i = 0;i<this.dele.length;i++){
		this.dele[i].onclick = function(){
			var x = this.getAttribute("data-id")
			var arr=JSON.parse(getCookie("shop"))
			this.parentNode.parentNode.remove()
			for(var i in arr){
				if(arr.length>=2){
					arr = arr.splice(x-1,1)
					setCookie("shop",JSON.stringify(arr),7)
				}else{
					removeCookie("shop",arr)
					empty.style.display = "block";
					goods.style.display = "none";
				}
			}
		}
	}
}
function Check(){
	this.allcheck = document.getElementById("allcheck")
	this.check = document.querySelectorAll(".check")
	var _this = this;
	this.allcheck.onclick = function(){
		if(_this.allcheck.checked){
			for(var i = 0;i<_this.check.length;i++){
				_this.check[i].checked = 'checked';
			}
		}else{
			for(var i = 0;i<_this.check.length;i++){
				_this.check[i].checked = '';
			}
		}			
	}
	for(var i = 0;i<this.check.length;i++){
		this.check[i].onclick = function(){
			var stop = true;
			for(var j = 0;j<_this.check.length;j++){
				if(_this.check[j].checked==false){
					stop = false;
					break;
				}
			}
			if(stop){
				_this.allcheck.checked = 'checked'
			}else{
				_this.allcheck.checked = ''
			}
		}
	}
}
			
