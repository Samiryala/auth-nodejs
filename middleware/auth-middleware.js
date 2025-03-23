const jwt=require('jsonwebtoken')

const authmiddleware=(req,res,next)=>{
    const headertoken=req.headers["authorization"]
    console.log(headertoken)
    const token = headertoken && headertoken.split(" ")[1]
    if(!token){
        return res.status(401).json({
            success:false,
            message: "no token "
        })
    }
    try {
        const decodtoken=jwt.verify(token,process.env.private_key)
        console.log("wow",decodtoken)
        req.userInfo= decodtoken
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: "no token after verify "
        })
    }
   
}
module.exports=authmiddleware