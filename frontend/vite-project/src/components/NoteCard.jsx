import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useState } from 'react';
import useNoteActions from '../hooks/useNoteActions';
import { motion } from "motion/react";
import { convertTimeStamp } from '../utilities/timeconvertor';

export default function NoteCard({ title, description, id, dateModified, isPinned }) {

    
    const [showPinIcon, setShowPinIcon] = useState(false);

    const {trimDescription, handleNoteSelect, deleteNote, pinNote, displayNoteAsList} = useNoteActions()

    return(
        <motion.div
            className='h-50 w-75 flex flex-col gap-0.5 rounded-xl p-1.5 mt-2.5 cursor-pointer overflow-y-auto bg-transparent text-inherit border-1 border-amber-100'
            onClick={() => handleNoteSelect(id, title, description, dateModified, isPinned)}
            whileHover={{ scale: 1.1 }}
        >
            <div className='mt-2'>
                <h4
                    className='text-2xl font-medium mt-2 border-b-1 mb-2'
                    onMouseEnter={() => setShowPinIcon(true)}
                    onMouseLeave={() => setShowPinIcon(false)}
                >
                    {title || 'New Note'}                 
                    {showPinIcon &&
                        <span className='float-right'>
                            <PushPinIcon onClick={(e) => pinNote(e, id, title, description, dateModified, isPinned)} />
                            <DeleteIcon onClick={(e) => deleteNote(e, id)} />
                        </span>
                    }
                </h4>
                {Array.isArray(description) ? displayNoteAsList(description) : trimDescription(description)}
            </div>
            <div className='text-xs font-extralight mt-auto'>
                {convertTimeStamp(dateModified) || convertTimeStamp(Date.now())}
                </div>
        </motion.div>
    )
}