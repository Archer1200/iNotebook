const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { body,validationResult } = require('express-validator')

const JWT_secret = "helloiamhimanshu"   // this is used for signature


//ROUTE:1 create a user using: post "/api/auth/createuser"
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    //if there are error, retun bad request and the error
    const error = validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    // await User.save()
    //check whether the user is exists with this email already
    try{

        let user = await User.findOne({email:req.body.email})
        if (user){
            return res.status(400).json({error: "sorry this email id is already exists.  "})
        }

        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password,salt)
        //create a new user
        user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secpass
        })
        // .then(user=>res.json(user))
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_secret)
        // console.log(authtoken)
        res.send({authtoken})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("internal server error")
    }


    
})

//ROUTE:2 delete a user using: post "/api/auth/deleteuser"
router.delete('/deleteuser',async (req,res)=>{
    const deluser = await User.deleteMany({})
    res.json(deluser)
    console.log("user deleted")
})

// ROUTE:3 authenticate  a user using: post "/api/auth/login", no login required

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','password can not be empty').exists(),
],async (req,res)=>{
    const error = validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    

    //mattching the req.email with the with db email
    const {email,password} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){

            return res.status(400).json({error:"please try to login with coreect credentials"})
        }

        //compare the password with db password
        const passwordcompare = await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            return res.status(400).json({error:"please try to login with correct credentials"})

        }
        const data = {
            user:{
                id:user.id
            }
        }
        //This is a signature
        const authtoken = jwt.sign(data,JWT_secret)
        // console.log(authtoken)
        res.send({authtoken})

    }
   catch(error){
        console.log(error.message)
        res.status(500).send("internal server error")
    }
})

//ROUTE:4 get loggedin user detail using:Post"api/auth/getuser". Login Required
router.post('/getuser',fetchuser,async (req,res)=>{
try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.json(user)
    
} catch(error){
        console.log(error.message)
        res.status(500).send("internal server error")
    }

})

module.exports = router