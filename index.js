const express = require("express"); //initialising express
const app = express();
const connection = require("./connection");
const AUTHOR_MODEL = require("./models/Authors");
const NEWS_MODEL = require("./models/News");
app.use(express.json());
const bcryptjs = require("bcryptjs");

app.post("/authsignup", async (req, res) => {
    try {
      const { name, email, password, phonenumber, address, numberofarticles } = req.body;
  
      let hashedpassword = await bcryptjs.hashSync(password, 12); 
  
      const newAuthor = new AUTHOR_MODEL({
        name,
        email,
        password: hashedpassword,
        phonenumber,
        address,
        numberofarticles
      });
      await newAuthor.save();
      res.json({ success: true, message: "New author saved" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/newssignup", async (req, res) => {
    try {
      const { newsheadline, newsdescription, newslocation, newsauthor } = req.body;
  
      const newNews = new NEWS_MODEL({
        newsheadline, 
        newsdescription, 
        newslocation, 
        newsauthor
      });
      await newNews.save();
      res.json({ success: true, message: "New news saved" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/allauthors", async (req,res) =>{
    try{
     const data = await AUTHOR_MODEL.find();
     res.json({ success: true, data });
    } catch (error) {
     console.log(error);
     res.status(400).json({ sucess: false, error: error.message });
    }
   });

   app.get("/allnews", async (req,res) =>{
    try{
     const data = await NEWS_MODEL.find();
     res.json({ success: true, data });
    } catch (error) {
     console.log(error);
     res.status(400).json({ sucess: false, error: error.message });
    }
   });

   app.put("/updatename", async(req,res) => {
    try{
     await AUTHOR_MODEL.findOneAndUpdate({ email: req.body.email }, {name: req.body.name});    
     res.json({success:true});
    } catch(error){
      res.status(400).json({ sucess: false });
    }
    });

    app.get("/ptclrnews/:newsauthor", async (req,res) =>{
        try{
         const data = await NEWS_MODEL.findOne({ newsauthor: req.params.newsauthor },
            {newsheadline: 1, newsauthor: 1});
         res.json({ success: true, data });
        } catch (error) {
         console.log(error);
         res.status(400).json({ sucess: false, error: error.message });
        }
       });

       app.get("/ptclrnewsl/:newslocation", async (req,res) =>{
        try{
         const data = await NEWS_MODEL.findOne({ newslocation: req.params.newslocation },
            {newsheadline: 1, newslocation: 1});
         res.json({ success: true, data });
        } catch (error) {
         console.log(error);
         res.status(400).json({ sucess: false, error: error.message });
        }
       });

       app.delete("/deletenews/:newsheadline",async(req,res)=>{
        try{
          await NEWS_MODEL.findOneAndDelete({newsheadline: req.params.newsheadline}); //which document to delete
        res.json({success:true});
      } catch (error){
        res.status(400).json({success:false});
      }
      });

connection();   //connecting to database


let port = 4000;
app.listen(port, () => console.log(`server is running at ${port}`));