const { Timestamp } = require('bson')
const mongoose = require ('mongoose')

const userschema=mongoose.Schema(
    {
        username:{
            type :String,
            require:true,
            unique : true,
            trim:true
        },
        email:{
            type : String,
            require : true,
            unique : true,
            trim : true,
            lowercase : true,
        },
        password:{
            type : String,
            require : true
        },
        role:{
            type : String,
            enum : ['user','admin'],
            default:'user'
        }
    }, {Timestamp:true}
)

module.exports=mongoose.model('Userauth',userschema)