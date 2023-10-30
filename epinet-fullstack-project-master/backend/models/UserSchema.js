
const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    type:{type:String, required:true},
    hasSiteApproved:{type:Boolean},
    hasRegionalApproved:{type:Boolean},
    hasHeadApproved:{type:Boolean},
    designation:{type:String},
    mobile:{type:String},
    cpf:{type:String},
    department:{type:String},
    location:{type:String},
    options:{type:[String]},

})

const UserModel = model('User', UserSchema);
module.exports = UserModel