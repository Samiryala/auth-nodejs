const isuseradmin =(req,res,next)=>{
    if(req.userInfo.role!=="admin"){
        res.status(403).json({
            success:false,
            message:"is not an admin"
        })
    }
    next()
}
module.exports=isuseradmin