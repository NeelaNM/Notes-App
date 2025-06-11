import Button from '@mui/material/Button';
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from '../store';

export default function NotesSection() {

    let notes = useSelector(state => state.items);
    const isOpen = useSelector(state => state.isOpen);
    const pinnedNotes = useSelector(state => state.pinnedNotes);

    notes = pinnedNotes.length > 0 ? notes.filter(item => !(pinnedNotes.map(item => item.id)).includes(item.id)) : notes;
        
    const dispatch = useDispatch();
    
    const createNewNote = () => {
        dispatch(notesActions.toggleModal(true));
    }

    console.log('----Notes section-----');

    return(
        <div className="mt-3">
            <Button variant='outlined' onClick={createNewNote}>+ Create new note</Button>
            {isOpen && 
                <NoteModal />
            }
            {pinnedNotes.length > 0 && <>
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
                    {notes.map(({id, description, title, updatedAt}) => 
                    <NoteCard 
                        title={title} 
                        description={description} 
                        id={id}
                        key={id}
                        dateModified={updatedAt}    
                    />)
                    }
            </div>
        </div>
    )
}