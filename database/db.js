const mongoose = require('mongoose')

const connecttodb=async()=>{
    try {
        mongoose.connect(process.env.mong_uri)
        console.log('database connect good')
    } catch (error) {
        console.error('probleme in database')
        process.exit(1)
    }
} 

module.exports=connecttodb