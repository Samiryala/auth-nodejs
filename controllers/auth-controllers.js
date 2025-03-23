const user=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//register 

const registeruser=async(req,res)=>{
    try {
        const {username,email,password,role}=req.body
        const checkuserexist=await user.findOne({$or:[{username},{email}]})
        if(checkuserexist){
            return res.status(400).json({ //hna darna return prc apres une res mata9derch dire wa7do5a 
            // res malge 3ambaelek beli matemchiche ya3ni bech tna7i had l mochkile dir return
                success:false,
                message: "the username or the email alredy exist"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt)

        const newuser= new user({
            username,
            email,
            password:hashpassword,
            role:role ||'user'
        })
         await newuser.save()

         if(newuser){
            res.status(201).json({
                success:true,
                message:"the user is register",
                data:newuser
            })
         }else{
            res.status(400).json({
                success:false,
                message:"somthing happend",
            })
         }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'somthing go wrong'
        })
    }
}

//login
const loginuser=async(req,res)=>{
    try {
        const {username,password}=req.body
        const theuser =await user.findOne({username})
        if(!theuser){
            return res.status(400).json({
                success:false,
                message:"this user does not exist"
            })
        }
        const ispassword=await bcrypt.compare(password,theuser.password)
        if(!ispassword){
             return res.status(400).json({
                success:false,
                message: "your password is incorrect"
            })
        }

        //creat a token
        const accesstoken=jwt.sign({
            userid:theuser._id,
            username:theuser.username,
            role:theuser.role
        },process.env.private_key,{expiresIn:'15m'})
        res.status(200).json({
            success:true,
            message:"you are logged in ",accesstoken
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'somthing go wrong'
        })
    }
}

const changepassword=async(req,res)=>{
    try {
        const userid=req.userInfo.userid
        //get the passwords
        const {oldpassword,newpassword}= req.body
        //find the user 
        const User=await user.findById(userid)
        if(!User){
            return res.status(400).json({
                success:false,
                message:"there no such user"
            })
        }
        const oldpasswordcorrect= await bcrypt.compare(oldpassword,User.password)
        if(!oldpasswordcorrect){
           return res.status(400).json({
                success:false,
                message:"your old password is inccorect"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const newhashpassword=await bcrypt.hash(newpassword,salt)
        const samepassword=await bcrypt.compare(oldpassword,newhashpassword)
        if(samepassword){
           return res.status(400).json({
                success:false,
                message:"your old password is the same as your new password"
            })
        }
        User.password=newhashpassword
        await User.save()
        res.status(200).json({
            success:true,
            data:newpassword
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"somthing go wrong when canging the password"
    })
}
}

module.exports={registeruser,loginuser,changepassword}