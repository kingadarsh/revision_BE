const {Command}=require("commander");
const { log } = require("console");
const fs = require("fs");
const readline=require("readline");
const program = new Command();


const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

program.name("CLI_TodoList")
.description("A Cli based todo list")
.version("1.0.0");
 

program.command("view")
.description("To view the todo")
.action((file)=>{
fs.readFile("a.txt","utf8",(err,data)=>{
    if(err){
       return console.log("The error is",err);
    }
    else{
        return console.log(data);
    }
    rl.close();
})
});

program.command("add")
.description("Add a todo")
.argument("<file>","give the filename where todo is to be added")
.action((file)=>{
    rl.question("What todo do you want to write",(Todo)=>{
        fs.appendFile("a.txt",`\n${Todo}`,(err)=>{
            if(err){
                return console.error("There was an error",err);
            }
            else{
                return console.log("The Todo is successfully created");
            }
            rl.close()
        })
    })
})



program.command("delete <filename> <linenum>")
.description("Delete a todo from the list")
.action((file,linenum)=>{
    fs.readFile("a.txt","utf8",(err,data)=>{
        if(err){
            return console.error("There was an error reading the file",err);
        }
        else{
            const lines=data.split("\n");

            if(linenum<1 || linenum>lines.length){
                return console.log("Invalid Line number");
            }
            else{
                lines.splice(linenum-1,1);
                const newData=lines.join("\n");

                fs.writeFile("a.txt",`${newData}`,(err)=>{
                    if(err){
                        return console.log("There was an error",err);
                    }
                    else{
                        console.log("Deleted line successfully");
                        
                    }
                    rl.close();
                    
                })
            }
        }
    })
})


program.parse();