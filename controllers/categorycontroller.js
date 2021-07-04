var bangdanhmuc = require('../models/Category');
module.exports.select = async function(){
	dsloaisp=await bangdanhmuc.selectAll()
	var kq="";
	for(i=0;i<dsloaisp.length;i++)
 		{
			kq=kq + "<li><a href='/"+dsloaisp[i].idCat+"'>"+dsloaisp[i].nameCat+"</a></li>"
		}
	console.log(kq);
    return kq;
}



