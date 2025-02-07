const express=require("express");
const app = express();
const fs =require("fs");

const PORT=process.env.PORT||3000;

// Middleware for Parsing JSON
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is running...");
})

const TodoList=[];


// ////////////////////////////////////////////////////

// Show the Todo Items
app.get("/view",(req,res)=>{
    fs.readFile("a.txt","utf8",(err,data)=>{
      if(err){
        console.error("There is an error",err);
      }
      else{
        // console.log(typeof(data));
        const newData=data.replace("\n","<br>");
        res.send(newData);
        console.log(data);
      }
    })
    
});

// Add the Todo in the List
app.post("/add",(req,res)=>{
    const {desc}=req.body;
    const linenum=TodoList.length+1;
    const todo=`${linenum}. ${desc}`;

    TodoList.push(todo);
    fs.appendFile("a.txt",`${todo}\n`,(err)=>{
        if(err){
            return res.send("There was a problem making a Todo");
        }
        else{
            res.send("Todo created succesfully");
            console.log("Todo Created Successfully");
        }
    })

});

// 
app.put("/update/:linenum",(req,res)=>{
    const {linenum}=parseInt(req.params);
    const {desc}=req.body;

    if(!desc){
        return res.send("New Todo Is needed");
    }

    fs.readFile("a.txt","utf8",(err,data)=>{
        if(err){
            return res.send("There was a problem reading while updating file");
        }
        else{
            const lines=data.split("\n");

            if(linenum>lines.length){
                return res.send("Invalid Line Number");
            }

            lines[linenum-1]=`${linenum}. ${desc}`;

            const newData=lines.join("\n");

            // /////////////////////
            console.log(newData);
            // /////////////////////

            fs.writeFile("a.txt",`${newData}\n`,(err)=>{
                if(err){
                    return res.json("There was a problem updating the file");
                }
                else{
                    res.json({
                        message:"Successfully updated  Todo",
                        New_data:newData
                    });
                }
            })

        }
    })

});

app.delete("/delete/:linenum",(req,res)=>{
    const linenum=parseInt(req.params.linenum);
    fs.readFile("a.txt","utf8",(err,data)=>{
        if(err){
            return res.status(400).send("There was a problem reading while deleting file");
        }
        else{
            const lines=data.split("\n");

            if(linenum>lines.length){
                return res.send("Invalid Line Number");
            }

            lines.splice(linenum-1,1);
            const newData=lines.join("\n");

            fs.writeFile("a.txt",`${newData}\n`,(err)=>{
                if(err){
                    return res.json("There was a problem deleting the Todo");
                }
                else{
                    res.json({
                        message:"Successfully Deleted Todo",
                        New_data:newData
                    });
                }
            })

        }
    })


});




app.listen(PORT,()=>{
    console.log('====================================');
    console.log(`Serving on port http://localhost:${PORT}`);
    console.log('====================================');
})