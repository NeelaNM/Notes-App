import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', notesSchema);

export default Note;