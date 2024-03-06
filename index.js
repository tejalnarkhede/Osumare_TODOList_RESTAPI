const express=require("express");
const app=express();
const port=2216;
const { v4: uuidv4 } = require('uuid');
const methodOverride=require('method-override');


const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(methodOverride("_method"));


app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));

let tasks=[
    {
        id:uuidv4(),
        task:"Drink Water"
    },
    {
        id:uuidv4(),
        task:"Do Exercise"
    },
    {
        id:uuidv4(),
        task:"Eat Salad"
    }
];


app.get("/tasks",(req,res)=>{
     res.render("index.ejs",{tasks});
});

app.get('/', (req, res) => {
    res.send("Running");
});

app.get("/tasks/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/tasks/:id",(req,res)=>{
    let {id}=req.params;
    console.log("In show id:"+id);
    let task=tasks.find((t) => id === t.id);
    console.log(task);
    res.render("show.ejs",{task});

});


app.post("/tasks",(req,res)=>{
    let {task}=req.body;
    let id=uuidv4();
    tasks.push({id,task});
     console.log(tasks); 
    res.redirect('/tasks');
});

app.patch("/tasks/:id",(req,res)=>{
    let {id}=req.params;
    let newtask=req.body.task;
    let task=tasks.find((t) => id === t.id);
    task.task=newtask;

    console.log(id+" "+task);
    res.redirect("/tasks");
});

app.get("/tasks/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log("In edit id:"+id);
    let task=tasks.find((t) => id === t.id);
    console.log(task);
    res.render("edit.ejs",{task});
  

});


app.delete("/tasks/:id",(req,res)=>{
    let {id}=req.params;
    //filtering
    tasks=tasks.filter((t) => id !== t.id);
    res.redirect("/tasks");
    
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
});