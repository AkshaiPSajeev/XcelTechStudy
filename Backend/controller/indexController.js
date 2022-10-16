const Users=require('../models/Users')

const addUser=async(req,res)=>{
    try{
        console.log(req.body);
        const{Name,Email,Password,Mobile,Country,State,City}=req.body;
        const user=await Users.findOne({Email:Email})
        if(user){
            console.log('herr');
            res.status(403).json({'message':'Email already Exists'})
        }else{
            const response=await Users.create(
                {
                    Name,
                    Email,
                    Password,
                    Mobile,
                    Country,
                    State,
                    City
    
                }
            );
           
            res.status(200).json({'message':'data inserted'})
        }
       

    }catch(err){
        res.status(500).json({'message':'insertion error'})
    }
}


module.exports={
    addUser
}