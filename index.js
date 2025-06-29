const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const {v4 :uuidv4} = require('uuid');
uuidv4();
const methdoverride = require("method-override"); // use to override the post request into patch request cause html dont support patch request

app.use(express.urlencoded({extended: true}));
app.use(methdoverride("_method"));

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {
        id :uuidv4(),
        username: "Avinash",
        content: "i m a coder",
    },
    {
        id :uuidv4(),
        username: "Avi",
        content: "i m a cricket",
    },
    {
        id :uuidv4(),
        username: "Avinash",
        content: "i m a boy",
    }
]

app.get("/posts" , (req,res)=>{       //in post request , data is stored in query form
    res.render("index.ejs" , {posts}); 
})
app.get("/posts/new" , (req,res)=>{
    res.render("new.ejs");            //wrting new post
})
app.post("/posts" , (req,res)=>{            
    let {username , content} = req.body;  //in post request , data is stored in body
    let id =uuidv4();
    posts.push({ id,username , content});
    res.redirect("/posts");            // redirecting to the original page after submiting post
    
})

app.get("/posts/:id", (req,res)=>{
    let{id} = req.params;             // retrieve data , in get request , data stored in parameters query
    let post = posts.find((p)=> id=== p.id);  // return the post of id whose id is same as requested id
    res.render("show.ejs", {post});       //showing new page of post in detail
})

app.patch("/posts/:id", (req,res)=>{       // updating route
    let{id} = req.params;             
    let newcontent = req.body.content;
    let post = posts.find((p)=> id=== p.id); 

    post.content = newcontent;
    console.log(post);
    res.redirect("/posts"); //redirect to the main page after editing 
})

app.get("/posts/:id/edit", (req,res) =>{      //edit route
    let{id} = req.params;             
    let post = posts.find((p)=> id=== p.id); 
    res.render("edit.ejs" , {post});
})    

app.delete("/posts/:id", (req,res)=>{
    let{id} = req.params; 
    posts = posts.filter((p)=> id !== p.id); //this line helps to filter out whose id is not same posts id after deleting 
    res.redirect("/posts");
})

app.listen(port, ()=>{
    console.log("app listen port");
})
