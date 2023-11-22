const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const empData = require("../model/empSchema");
require("../db/connect");

function verifytoken(req,res,next){
  try{
    const token=req.headers.token;
    console.log(token);
    if(!token) throw 'Unauthorized';
    let payload=jwt.verify(token,'reactempapp');
    if(!payload) throw 'Unauthorized';
    next()
  }
  catch(error){
    //console.log(error);
    res.status(401).send('error');
  }
}


//GET Method -----------------

router.get("/",verifytoken, async (req, res) => {
  try {
    const data = await empData.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("No data found");
  }
});

// POST Method----------

router.post("/add",verifytoken, async (req, res) => {
  try {
    var item = req.body;
    const Data = new empData(item);
    const saveddata = await Data.save();
    res.status(200).send("Added Successful");
  } catch (error) {
    res.status(404).send("Error !");
  }
});



router.put('/edit/:id',verifytoken, async(req,res)=>{
  try {
      var item=req.body;
     const data= await empData.findByIdAndUpdate(req.params.id,item);
      res.status(200).send('Updated successfully');
  } catch (error) {
      res.status(404).send('Update not working');
  } 
  
})

//Deleted Method-----------

router.delete("/remove/:id",verifytoken, async (req,res) => {
 
  try {
    const BlogId = req.params.id;
    const data = await empData.findByIdAndDelete(BlogId);
    console.log(data)
    res.status(200).send('Deleted');
  } catch (error) {
    res.status(404).send("No data found");
  }
});

module.exports = router;
