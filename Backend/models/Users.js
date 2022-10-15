const mongoose=require('mongoose');

const Users=mongoose.Schema(
    {
       
        Name:{type:String,required:true},
        Email:{type:String,required:true},
        Password:{type:String,required:true},
        Mobile:{type:String,required:true},
        Country:{type:String,required:true},
        State:{type:String,required:true},
        City:{type:String,required:true},
        


    },
    {
        collection:'Users'
    }
);

module.exports=mongoose.model('Users',Users);