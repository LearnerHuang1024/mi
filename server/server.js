//引入需求模块
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var multipart = require('connect-multiparty');
var svgCaptcha = require('svg-captcha')

var multipartMiddleware = multipart();
var app = express();
//处理post请求
// for parsing application/json
// app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// 创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hch960218',
    database: 'mi',
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

//登陆验证接口
app.post('/sendcaptcha', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var captcha = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 40,
        width: 100,
        color: false
    });
    var obj = {
        data: captcha.data,
        text: captcha.text.toLowerCase()
    }
    res.send(obj)
})

//查询商品基础信息接口
app.post('/goods', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from goods where goods_type = '${req.body.type}' or goods_id = '${req.body.id}'`, function(error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send(results);
        }
    });
})

//搜索页接口
app.post('/goodsquery', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`select * from goods where to_pinyin(goods_name) like '%'${req.body.keyword}'%'or goods_name like '%'${req.body.keyword}'%';`, function(error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send(results);
        }
    });
})

//赠品查询
app.post('/goods/gift', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from goods_gift where goods_id = '${req.body.id}'`, function(error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send(results);
        }
    });
})

//商品规格
app.post('/goods/attrs', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from goods_attrs where goods_id = '${req.body.id}'`, function(error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send(results);
        }
    });
})

//商品颜色
app.post('/goods/color', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from goods_color where goods_id = '${req.body.id}'`, function(error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send(results);
        }
    });
})

//省
app.post(`/province`, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from hat_province`, function(error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send(results);
        }
    });
})

//市
app.post(`/city`, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from hat_city where father = '${req.body.province}'`, function(error, results, fields) {
        if (error) {
            res.send(error);
            return;
        } else {
            res.send(results);
        }
    });
})

//区
app.post(`/area`, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from hat_area where father = '${req.body.city}'`, function(error, results, fields) {
        if (error) {
            res.send(error);
            return;
        } else {
            res.send(results);
        }
    });
})

//用户信息接口
app.post(`/account`, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`SELECT * from user where u_username = '${req.body.account}' or u_phone = '${req.body.account}' or u_email = '${req.body.account}'`, function(error, results, fields) {
        if (error) {
            res.send(false);
            return;
        } else {
            res.send(results);
        }
    });
})

//注册接口
app.post(`/user`, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query(`INSERT INTO user ( u_username, u_password,u_email,u_phone,u_profilephoto) VALUES
                    ( '${req.body.user}',' ${req.body.key}','${req.body.email}','${req.body.phone}','${req.body.head}');`, function(error, results, fields) {
        if (error) {
            res.send(error);
            return;
        } else {
            res.send('success');
        }
    });
})


app.listen(52013);
console.log('start server');