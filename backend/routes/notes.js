const express = require("express");
const router = express.Router();

const fetchuser = require("../middleware/fetchuser");
const Note = require("../model/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : GET ALL NOTES USING: GET "/api/auth/fetchallnotes" Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
    
  }
});
//ROUTE 2 : ADD NEW NOTES USING: Post "/api/auth/addnotes" Login Required
router.post(  "/addnotes",  fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({min: 5}),
  ],
  async (req, res) => {
    try {
        const {title, description, tag} = req.body
        //if there are error, retun bad request and the error
            const error = validationResult(req)
            if (!error.isEmpty()){
                return res.status(400).json({error:error.array()})
            }
            const note = new Note({title,description,tag,user:req.user.id})
            const savednote = await note.save()
                res.json(savednote);
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal Server Error")
    }
  });

  //ROUTE 2 : DELETE NOTES USING: Delete "/api/auth/deletenotes" Login Required
    router.delete("/deletenotes/:id", fetchuser,  async (req, res) => {

    // find the note to be updated and update it
   try {
     let note = await Note.findById(req.params.id)
     if(!note){return res.status(404).send("NOt Found")}
 
     if(note.user.toString() !== req.user.id ){return res.status(401).send("NOt allowed")}
 
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"success":"Note has been Deleted",note:note})
 
   } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
   }
   
})

  //ROUTE 3 : UPDATING EXISTING NOTES USING: Delete "/api/auth/updatenotes" Login Required

router.put(  "/updatenotes/:id",[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({min: 5})

], fetchuser,  async (req, res) => {
    const {title,description,tag} = req.body

    //create a new note object
    const newnote = {}
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}

// find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("NOt Found")}

    if(note.user.toString() !== req.user.id ){return res.status(401).send("NOt allowed")}

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({note})

   
})








module.exports = router;
