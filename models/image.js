const mongoose = require('mongoose')
const imageschema=new mongoose.Schema({
url:{
    type:String,
    required : true
},
publicId:{
    type:String,
    required : true
},
uplodedby:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "user",
    required:true
}
},{timestamps:true})


module.exports=mongoose.model('image',imageschema)