const fs = require("fs");
const {Command}=require("commander");
const program=new Command();

// fs.readFile("a.txt","utf8",(err,data)=>{
//     if(err){
//         console.error("Error reading the file",err.message);
//         return;
//     }
//     else{
//         console.log("File content: ",data);
//     }
// });


program.name("Count-Word")
.description("A CLI tool to count words in a file")
.argument("<file>","name of the file from where to count the words")
.action((file)=>{
    fs.readFile(file,"UTF-8",(err,data)=>{
        if(err){
            return console.error("There was an error reading the file", err.message);
        }
        else{
            let k=1;
            for(let i =0;i<data.length;i++){
                if(data[i]==' '){
                    k++;
                }
            }

            console.log(`The total word in the file is ${k}`);
        }
    })
});

program.parse();