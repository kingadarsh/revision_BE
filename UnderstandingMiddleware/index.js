const express = require("express");
const app = express();
const PORT=process.env.PORT||3000;



app.use(express.json());


app.get("/sum",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.send(`The sum is: ${a+b}`);
})

app.get("/sub",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    if(a>b){
        return res.send(`The substraction is : ${a-b}`);
    }
    else{
       return  res.send(`The substraction is : ${b-a}`);
    }  
})

app.get("/mul",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);

    res.send(`The answer of multiplication: ${a*b}`);
})

app.get("/div",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);

    res.send(`The answer is : ${a/b}`);
})



app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
});



