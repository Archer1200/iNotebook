const express = require("express");
const router = express.Router();

const fetchuser = require("../middleware/fetchuser");
const Notes = require("../model/Notes");
const { body, validationResult } = require("express-validator");


//ROUTE:1 get all the notes using :"api/auth/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

//ROUTE:2 get Add new note using :"api/notes/addnote". Login required

router.post(  "/addnote",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if there are error, retun bad request and the error
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  },
);


module.exports = router;
