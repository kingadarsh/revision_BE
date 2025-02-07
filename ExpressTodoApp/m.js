const fs=require("fs");

fs.readFile("a.txt","utf8",(err,data)=>{
    if(err){
        console.error("There was an error");
    }
    else{
        const lines=data.split("\n");
        // console.log(lines);
        const str=lines.join();
        console.log(str);
        // for(let i=0;i<lines.length;i++){
        //     console.log(lines[i]);
        // }
    }
})