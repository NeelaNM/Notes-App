import Button from '@mui/material/Button';

import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from '../store';
import SearchField from './SearchField';
import { useState, useEffect } from 'react';

export default function NotesSection() {

    const [filteredNotes, setFilteredNotes] = useState([]);

    let notes = useSelector(state => state.items);
    const isOpen = useSelector(state => state.isOpen);
    const pinnedNotes = useSelector(state => state.pinnedNotes);
    const searchTerm = useSelector(state => state.searchTerm);

    notes = pinnedNotes.length > 0 ? notes.filter(item => !(pinnedNotes.map(item => item.id)).includes(item.id)) : notes;
        
    const dispatch = useDispatch();
    
    const createNewNote = () => {
        dispatch(notesActions.toggleModal(true));
    }

    useEffect(() => {
        const temp = notes.filter(item => item.title?.toLowerCase().includes(searchTerm) || item.description?.toLowerCase().includes(searchTerm));
        setFilteredNotes(temp);
        console.log(temp)
    }, [searchTerm, isOpen])

    return(
        <div className="mt-3">
            <div className='flex justify-between items-center'>
                <Button variant='outlined' onClick={createNewNote}>+ Create new note</Button>
                <SearchField />
            </div>
           {isOpen && <NoteModal />}
            {(pinnedNotes.length > 0 && !searchTerm) && <>
                <h2 className='font-extrabold mt-2.5 pl-1.5 border-b-2'>Pinned Notes </h2>
                <div className='grid grid-cols-3 gap-10'>
                 {pinnedNotes.map(({id, description, title}) => 
                    <NoteCard 
                        title={title} 
                        description={description} 
                        id={id}
                        key={id}
                    />)
                  }
                </div>
                <h2 className='font-extrabold mt-2.5 pl-1.5 border-b-2'>Others</h2>
                </>
            }
            <div className='grid grid-cols-3 gap-10'>
                    {(!searchTerm ? notes : filteredNotes).map(({id, description, title, dateModified}) => 
                    <NoteCard 
                        title={title} 
                        description={description} 
                        id={id}
                        key={id}
                        dateModified={dateModified}    
                    />)
                    }
            </div>
        </div>
    )
}