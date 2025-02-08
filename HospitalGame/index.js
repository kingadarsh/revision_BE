const express = require("express");
const { log } = require("node:console");
const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Server is running");
});

// How many kidneys does an hospital has right now
const h=[
    {
        name:"Appolo Hospital",
        kidney:[
            {
                isHealthy:false
            },{
                isHealthy:true
            }
        ]     
    },
];



//  Get - : - User can check how many kidneys hospital has and their health
app.get("/show",(req,res)=>{
    const hospitalName=h[0].name;
    const kidney=h[0].kidney;
    let totalKidney=0;
    let healthyKidney=0;
    let unHealthyKidney=0;

    for(let i =0;i<kidney.length;i++){
        totalKidney++;
        if(kidney[i].isHealthy==true){
            healthyKidney++
        }
        else if(kidney[i].isHealthy==false){
            unHealthyKidney++;
        }
    }

    res.json({
        HospitalName:hospitalName,
        TotalKidneyAvailable:totalKidney,
        HealthyKidney:healthyKidney,
        UnHealthyKidney:unHealthyKidney
    })



});

// Add new Healthy kidney's to the hospital
app.post("/add",(req,res)=>{
    const isHealthy=req.body.isHealthy;
    const kidney=h[0].kidney;
    kidney.push({
        isHealthy:isHealthy
    });

    res.json({
        message:"Added the kidney"
    })
});




// Replace a damaged kidney with a healthy one.
app.put("/update",(req,res)=>{
    
    const kidney=h[0].kidney;
    let index=0;
    for(let i=0;i<kidney.length;i++){
        if(kidney[i].isHealthy==false){
            kidney[i].isHealthy=true;
            index=i;
            break;
        }
        else{
            continue;
        }
    }

    
    const currentUpdation=kidney[index].isHealthy
    

    res.json({
        message:"Updated",
        updatedIndex:index,
        CurrentUpdations:currentUpdation
    })
    

});


/*

const h=[
    {
        name:"Appolo Hospital",
        kidney:[
            {
                isHealthy:false
            },{
                isHealthy:true
            }
        ]     
    },
];

*/

// Remove a kidney (simulating kidney removal).
app.delete("/delete", (req, res) => {
    const hospital = h[0];

    if (!hospital || !hospital.kidney) {
        return res.status(500).json({ error: "Hospital data not found" });
    }

    const initialCount = hospital.kidney.length;

    // Keep only healthy kidneys
    hospital.kidney = hospital.kidney.filter(k => k.isHealthy);

    const removedCount = initialCount - hospital.kidney.length;

    if (removedCount === 0) {
        return res.status(404).json({ message: "No unhealthy kidneys to remove" });
    }

    res.json({
        message: `Deleted ${removedCount} unhealthy kidney(s)`,
        remainingKidneys: hospital.kidney
    });
});


app.listen(PORT,()=>{
    console.log(`Serving on http://localhost:${PORT}`)
})
