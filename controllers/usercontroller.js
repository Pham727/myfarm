var banguser = require('../models/User');
module.exports.login = async function (tendn,matkhau){
   // var check=true;
    //var dskh = await banguser.select({username:tendn,password:matkhau,isValid:check});
    var dskh = await banguser.select({username:tendn,password:matkhau});
    if (dskh.length>0)
        return dskh[0];
    return "";
}

module.exports.find = async function (unique){
    var user = await banguser.findUser({uniqueString:unique});
    if(user){
       return user;
    }
   return null
}

module.exports.update = async function (unique){
   
    var user= await banguser.updateUser({uniqueString:unique});
    return user;
}

module.exports.insert = async function(newUser){
    console.log(newUser);
    createdkh = await banguser.insert(newUser);
    return createdkh;
}