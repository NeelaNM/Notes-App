import express from "express";
import Note from "../models/notes.model.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const notes = await Note.find({});
        res.status(200).json({sucess: true, data: notes})
    }catch(err){
        console.log("Error..");
        res.status(500).json({success: false, message: 'Error in retrieving..'})
    }
})

router.post("/", async (req, res) => {
    const note = req.body;

    if(!note.id){
        return res.status(400).json({success: false, message: 'Invalid note'});
    }

    const newNote = new Note(note);

    try{
        await newNote.save();
        res.status(201).json({success: true, data: newNote});
    }catch(err){
        console.log('Error in creating note: ', err.message)
    }
})

router.put("/:id", async (req,res) => {
    const { id } = req.params;
    console.log(id);
    const updatedNote = req.body;
    console.log(updatedNote);
    try{
        const newNote = await Note.findByIdAndUpdate(id, updatedNote, {new: true});
        res.status(200).json({success: true, data: newNote});
    }catch(err){
        res.status(500).json({success: false, message: 'Errro..'})
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try{
        await Note.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Successfully deleted'});
    }catch(err){
        res.status(404).json({success: false, message: 'Not found'})
    }
})


export default router;