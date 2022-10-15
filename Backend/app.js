const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const dotenv=require('dotenv');
const bodyparser=require('body-parser')

const app=express();
app.use(cors());
dotenv.config();
app.use(bodyparser.json())
const indexRouter=require('./routes/indexRouter');

app.listen(8081,(req,res)=>{
    console.log('server started');
})
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('mongo db connection failed');
})

app.use('/',indexRouter);

app.listen()