const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const addpostData = require("../model/empSchema");
require("../db/connect");

//GET Method -----------------

router.get("/", async (req, res) => {
  try {
    const data = await addpostData.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("No data found");
  }
});

// POST Method----------

router.post("/add", async (req, res) => {
  try {
    var item = req.body;
    const Data = new addpostData(item);
    const saveddata = await Data.save();
    res.status(200).send("Added Successful");
  } catch (error) {
    res.status(404).send("Error !");
  }
});

// // PUT/Update Method-----------

// router.put('/update',(req,res)=>{
//     console.log(req.body);
//     array1.splice(0,1,req.body);
//     res.send(array1)
// })

//Deleted Method-----------

router.delete("/remove/:id", async (req,res) => {
 
  try {
    const BlogId = req.params.id;
    const data = await addpostData.findByIdAndDelete(BlogId);
    console.log(data)
    res.status(200).send('Deleted');
  } catch (error) {
    res.status(404).send("No data found");
  }
});

module.exports = router;
