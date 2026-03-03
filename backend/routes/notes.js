const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send('bye guys')
})




module.exports=router