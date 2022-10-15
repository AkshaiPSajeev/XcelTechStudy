const express=require('express');
const { addUser } = require('../controller/indexController');
const router=express.Router();


router.post('/addUser',addUser)

module.exports=router;