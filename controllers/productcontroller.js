var bangsanpham=require('../models/Product')
module.exports.select= async function (maloai)
{
    if(maloai==""){
        dssanpham= await bangsanpham.selectAll();
    }else{
	    dssanpham= await bangsanpham.select({idCat:maloai});
    }
	//dssanpham=await csdl.DocBang(query);
	var kq="";
	for(i=0;i<dssanpham.length;i++)
	 {
       kq=kq+"<div class='col-lg-4'>"
        +"<div class='product-item'>"
           + "<div class='product-image'>"
               +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                    +"<img src='../img/"+dssanpham[i].imgProduct+"' alt='Product Image'>"
                +"</a>"
                +"<div class='product-action'>"
                    +"<a href='#'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
            +"</div>"
            +"<div class='product-content'>"
               +"<div class='title'><a href='/detail/"+dssanpham[i].idProduct+"'>"+dssanpham[i].nameProduct+"</a></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+dssanpham[i].priceProduct+"đ</div>"
               +"</div>"
            +"</div>"
        +"</div>"
	}
		 
	return kq;
}

//xem thông tin chi tiết sản phẩm
module.exports.selectChitiet= async function (masp)
{
    chitietsp=await bangsanpham.select({idProduct:masp})
	var kq=" ";
	for(i=0;i<chitietsp.length;i++)
	 {
		  
        kq=kq+"<div class='row align-items-center product-detail-top'>"
                +"<div class='col-md-5'>"
                    +"<div class='product-image'>"
                        +"<img src='../img/"+chitietsp[i].imgProduct+"' alt='Product Image'>"
                    +"</div>"
                 +"</div>"
                +"<div class='col-md-7'>"
            +"<div class='product-content'>"
                +"<div class='title'><h2>"+chitietsp[i].nameProduct+"</h2></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+chitietsp[i].priceProduct+"đ</div>"
                +"<div class='details'>"
                    +"<p>"+chitietsp[i].desProduct+"</p>"
                +"</div>"

                +"<div class='quantity'>"
                    +"<h4>Quantity:</h4>"
                    +"<div class='qty'>"
                        +"<button class='btn-minus'><i class='fa fa-minus'></i></button>"
                        +"<input type='text' value='1'>"
                        +"<button class='btn-plus'><i class='fa fa-plus'></i></button>"
                        +"</div>"
                        +"</div>"
                +"<div class='action'>"
                    +"<a href='#'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
              +"</div>"
            +"</div>"
        +"</div>"
			 break;  			   
	}		 
	return kq;
}

//danh sách các sản phẩm có liên quan với sản phẩm chi tiết
module.exports.selectsplienquan= async function (masp)
{
	/*var query='SELECT * FROM product WHERE idProduct='+masp;
	chitietsp=await csdl.DocBang(query);
     
    var query2='SELECT * FROM product WHERE idCat='+chitietsp[0].idCat
    dssanpham=await csdl.DocBang(query2);*/
    chitietsp=await bangsanpham.select({idProduct:masp});
    dssanpham=await bangsanpham.select({idCat:chitietsp[0].idCat})
	var kq=" ";
	for(i=0;i<dssanpham.length;i++)
	 {
		  
    kq=kq+ "<div class='col-lg-3'>"
        +"<div class='product-item'>"
           + "<div class='product-image'>"
                +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                    +"<img src='../img/"+dssanpham[i].imgProduct+"'alt='Product Image'>"
                +"</a>"
                +"<div class='product-action'>"
                    +"<a href='#'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
            +"</div>"
            +"<div class='product-content'>"
                +"<div class='title'><a href='/detail/"+dssanpham[i].idProduct+"'>"+dssanpham[i].nameProduct+"</a></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+dssanpham[i].priceProduct+"</div>"
            +"</div>"
        +"</div>"
    +"</div>"  
	}		 
	return kq;
}

//danh sách sản phẩm nổi bật
module.exports.selectsanphamnoibat= async function ()
{
    
    /*var query='SELECT * from product';
	dssanpham=await csdl.DocBang(query);*/
    dssanpham=await bangsanpham.selectAll();
	var kq="";
	for(i=0;i<dssanpham.length;i++)
	 {
       kq=kq+ "<div class='col-lg-3'>"
        +"<div class='product-item'>"
            +"<div class='product-image'>"
                +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                +"<img src='../img/"+dssanpham[i].imgProduct+"' alt='Product Image'>"
                +"</a>"
                +"<div class='product-action'>"
                    +"<a href='#'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
            +"</div>"
            +"<div class='product-content'>"
                +"<div class='title'><a  href='/detail/"+dssanpham[i].idProduct+"'>"+dssanpham[i].nameProduct+"</a></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+dssanpham[i].priceProduct+"đ</div>"
            +"</div>"
        +"</div>"
    +"</div>"
	}		 
	return kq;
}

module.exports.timKiem= async function (tensanpham)
	{
		/*var query="SELECT * from product where nameProduct like'%"+tensanpham +"%'";
        dstimkiem=await csdl.DocBang(query);*/
        var dstimkiem= await bangsanpham.select({$or:[{nameProduct: new RegExp(tensanpham,'i')},{desProduct: new RegExp(tensanpham,'i')}]});
        var kq="";
        for(i=0;i<dstimkiem.length;i++)
         {
           kq=kq+"<div class='col-lg-4'>"
            +"<div class='product-item'>"
               + "<div class='product-image'>"
                   +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                        +"<img src='../img/"+dstimkiem[i].imgProduct+"' alt='Product Image'>"
                    +"</a>"
                    +"<div class='product-action'>"
                        +"<a href='#'><i class='fa fa-cart-plus'></i></a>"
                        +"<a href='#'><i class='fa fa-heart'></i></a>"
                        +"<a href='#'><i class='fa fa-search'></i></a>"
                    +"</div>"
                +"</div>"
                +"<div class='product-content'>"
                   +"<div class='title'><a href='/detail/"+dssanpham[i].idProduct+"'>"+dstimkiem[i].nameProduct+"</a></div>"
                    +"<div class='ratting'>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                    +"</div>"
                    +"<div class='price'>"+dstimkiem[i].priceProduct+"đ</div>"
                   +"</div>"
                +"</div>"
            +"</div>"
        }        
        return kq;
	}

