var mongoose= require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    idProduct:String,
    idCat:String,
    nameProduct:String,
    priceProduct:String,
    imgProduct:String,
    desProduct:String,
});
userProduct=mongoose.model('product',userSchema);
module.exports.selectAll=async function(){
    var userData=await userProduct.find({});
    return userData;
}

module.exports.select=async function(query){
    var userData=await userProduct.find(query);
    return userData;
}