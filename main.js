var express = require('express');
var nodemailer = require('nodemailer');
var app =express();
app.set('view engine','ejs');
var publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//Su dung Session
var session = require('express-session');
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: '1234567abc', 
    cookie: { maxAge: 60000 }}));
const { Console } = require('console');
const { render } = require('ejs');
//var user=require('./controllers/usercontroller');



var danhmuc=require('./controllers/categorycontroller');
var sanpham=require('./controllers/productcontroller')
var User=require('./controllers/usercontroller')

app.get('/',function(req,res){
  HienThi(req,res);
});

app.get('/dangnhap',function(req,res){
		var taikhoan=dangnhap(req,res);
    var giohang=ThongTinGioHang(req)
    res.render('login',{dangnhap:taikhoan,ttgiohang:giohang});
});

app.get('/taikhoan',function(req,res){
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req)
  res.render('account',{dangnhap:taikhoan,ttgiohang:giohang});
});

app.get('/dangki',function(req,res){
    res.render('registration');
});

app.get('/contact',function(req,res){
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req)
  res.render('contact',{dangnhap:taikhoan,ttgiohang:giohang});
});

app.get('/cart',function(req,res){
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req)
  res.render('cart',{dangnhap:taikhoan,ttgiohang:giohang});
})

app.get('/checkout',function(req,res){
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req)
  res.render('checkout',{dangnhap:taikhoan,ttgiohang:giohang});
})


app.get('/:maloai', function(req, res) {
	var maloai=req.params.maloai;
	if(isNaN(maloai)==false)
	{
        HienThiDsSanPham(req,res,maloai); 
    }
    else if(maloai=="product"){
        HienThiDsSanPham(req,res,"");
    }
	else if(maloai=="dangki"){
		res.render('registration');
	}
   
});

app.get('/detail/:masp', function(req, res) {
	var masp=req.params.masp;
	
	if(isNaN(masp)==false)
	{
	 HienThiChiTiet(req,res,masp); 
	}
});

app.post('/search',function(req,res){
  var tensanpham=req.body.tensp;
  HienThiTimKiem(res,tensanpham);
  })

app.post('/dangnhap', async(req,res)=> {
  var ttdangnhap=req.body;
	tendn=ttdangnhap.ho_ten;	
	matkhau=ttdangnhap.mat_khau;
  var user = await User.login(tendn,matkhau);
  if(!user){
    return res.status(401).send({ msg:'Thông tin đăng nhập sai. vui lòng kiểm tra lại thông tin đăng nhập'});
  }
  else if(user.isValid == false){
    return res.status(401).send({msg:'Email của bạn chưa được xác nhận . Vui lòng kiểm tra email của bạn'});
  }
  else{
    req.session.user=user;
    res.redirect('/');
  }
});

/*async function dangnhap(req,res,tendn,matkhau){
	var kh = await khachhangController.login(tendn,matkhau);
	req.session.kh=kh;
	HienThi(req,res,'Hoa-Cuc');
}*/

app.post('/dangki', async(req,res)=>{
	var ttdangki=req.body;
	hoten=ttdangki.ho_ten;	
	email=ttdangki.email;
	matkhau=ttdangki.mat_khau;
  tendn=ttdangki.ten_dn;
  sodt=ttdangki.so_dt;
	diachi=ttdangki.dia_chi;
	var uniqueString= randString();
  var isValid=false;
  user= User.insert({name:hoten,email:email,uniquestring:uniqueString,isValid:isValid,password:matkhau,uname:tendn,address:diachi,phone:sodt});
  sendMail(email,uniqueString);
  return res.status(200).send("<p>Một email xác nhận đã được gửi đến " + email + ". Click vào link để được xác nhận đăng kí thành công.</p>");
});


const randString = ()=>{
    const len=8;
    let randStr='';
    for(let i=0;i<len;i++){
        const ch=Math.floor((Math.random()*10)+1);
       randStr+=ch;
    }
    return randStr;
}


const sendMail= (email,uniqueString)=>{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: 'myfarm.nongsansach@gmail.com',
          pass: 'oxcfgkjcigfqvgyj'
        }
      });
     
      var mailOptions = {
        from: 'myfarm.nongsansach@gmail.com',
        to: email,
        subject: 'Xác nhận đăng kí',
        text: 'Chào bạn!',
        html:"Click <a href='http://localhost:8000/verify/"+uniqueString+"'>here</a> to verity your email. Thank You!"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

app.get('/verify/:uniqueString', async(req,res)=>{
  var unique =req.params;
  const{uniqueString}=req.params;
  console.log(uniqueString);
  console.log(unique); 
     //user= User.find({uniquestring:uniqueString});
     user= User.find(uniqueString);
    if(user){
       // user= User.update({uniquestring:uniqueString});
       user= User.update(uniqueString);
        res.redirect('/')
    }else{
        res.json('User not found')
    }
})

async function HienThi(req,res)
{
   var dssanphamnoibat=await sanpham.selectsanphamnoibat();
   var dssanphamganday=await sanpham.selectsanphamnoibat();
   var taikhoan=dangnhap(req,res);
	 var giohang=ThongTinGioHang(req)
   res.render('index',{spnoibat:dssanphamnoibat,spganday:dssanphamganday,dangnhap:taikhoan,ttgiohang:giohang}); 
}
 

async function HienThiDsSanPham(req,res,maloai)
{
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req);
    var danhmucsanpham= await danhmuc.select();
    var dssanpham=await sanpham.select(maloai);
    res.render('product-list',{danhmucsp:danhmucsanpham,danhsachsanpham:dssanpham,dangnhap:taikhoan,ttgiohang:giohang});
}

async function HienThiTimKiem(req,res,tensanpham)
{  
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req)
	var dsachtimkiem=await sanpham.timKiem(tensanpham);
	res.render('product_search',{dstimkiem:dsachtimkiem,dangnhap:taikhoan,ttgiohang:giohang});
}

async function HienThiChiTiet(req,res,masp)
{
  var taikhoan=dangnhap(req,res);
  var giohang=ThongTinGioHang(req)
	var ttchitietsanpham=await sanpham.selectChitiet(masp);
	var dssanphamlienquan=await sanpham.selectsplienquan(masp);
    res.render('product-detail',{chitietsp:ttchitietsanpham,splienquan:dssanphamlienquan,dangnhap:taikhoan,ttgiohang:giohang});
}

function dangnhap(req,res){
  var taikhoan="";
   if (req.session.user!=undefined && req.session.user!=""){
      tenkh="Chào, " +req.session.user.username;
      taikhoan=taikhoan+ "<a href='#' class='dropdown-toggle' data-toggle='dropdown'>"+tenkh+"</a>"
                        +"<div class='dropdown-menu'>"
                              +"<a href='/taikhoan' class='dropdown-item'>Tài khoản</a>"
                              +"<a href='/dangki' class='dropdown-item'>Đăng xuất</a>"
                        +"</div>"
   }else{
    taikhoan=taikhoan+ "<a href='#' class='dropdown-toggle' data-toggle='dropdown'>Tài khoản</a>"
     +"<div class='dropdown-menu'>"
        +"<a href='/dangnhap' class='dropdown-item'>Đăng nhập</a>"
        +"<a href='/dangki' class='dropdown-item'>Đăng kí</a>"
    +"</div>"
   }
   return taikhoan;
}

function ThongTinGioHang(req){
	var ttgh="";
	var sl=0;
	
	if (req.session.giohang!=undefined){
		for (i=0;i<req.session.giohang.length;i++){
			sl = sl + req.session.giohang[i].soluong; 
		}
		//ttgh = "<b>Số Lượng :<b>"+ sl + "<br><b>Thành tiền:</b>"+tt+"<br><a href = '/chitietgiohang'>Chi tiết..</a>"
    ttgh = "<span>("+sl+")</span>"
	}	
  else{
    ttgh ="<span>("+sl+")</span>"
  }
  console.log(ttgh);
	return ttgh;
}
 app.listen(8000);
console.log('8000 is the magic port');
