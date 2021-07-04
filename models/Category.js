var mongoose= require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    idCat:String,
    nameCat:String,
});

userCategory=mongoose.model('category',userSchema);
module.exports.selectAll=async function(){
    var userData=await userCategory.find({});
    return userData;
}