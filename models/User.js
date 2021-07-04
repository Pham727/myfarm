var mongoose = require('mongoose');
var db = require('../database');


var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    uniqueString:String,
    isValid:Boolean,
    password: String,
    username:String,
    address:String,
    phone:String,
});

var User = mongoose.model('user', UserSchema);

module.exports.select = async function(query){
    console.log(query);
    var banguser = await User.find(query)
    return banguser;
}

module.exports.findUser = async function(query){
    console.log(query);
    var user = await User.findOne(query)
    return user;
}


module.exports.updateUser = async function(query){
    var user = await User.findOne(query)
    user.isValid = true;
    await user.save();
    return user;
    /*var user = await User.updateOne(query,{$set:{isValid: ture }});
    return user;*/
}



module.exports.insert = async function (newkhachhang){
    const us = new User({
        name:newkhachhang.name,
        email:newkhachhang.email,
        uniqueString:newkhachhang.uniquestring,
        isValid:newkhachhang.isValid,
        password:newkhachhang.password,
        username:newkhachhang.uname,
        address:newkhachhang.address,
        phone:newkhachhang.phone
    });
    var userData = await us.save();
    return userData;
}