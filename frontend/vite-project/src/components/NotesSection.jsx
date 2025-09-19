import Button from '@mui/material/Button';
import axios from 'axios';
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from '../store';
import SearchField from './SearchField';
import { useState, useEffect } from 'react';
import ListView from './NotesView/ListView';

export default function NotesSection() {
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let notes = useSelector(state => state.items);
    const isOpen = useSelector(state => state.isOpen);
    const pinnedNotes = useSelector(state => state.pinnedNotes);
    const searchTerm = useSelector(state => state.searchTerm);
    const isListView = useSelector(state => state.isListView);

    const dispatch = useDispatch();

    const fetchNotes = async () => {
        try{
            setIsLoading(true);
            const { data: notes}  = await axios.get("/api/notes");
            notes.data.forEach(item => {
                const note =  {
                id: item._id,
                title: item.title || '',
                description: item.description,
                dateModified: item.updatedAt || item.createdAt,
                isPinned: item.isPinned,
                }
                dispatch(notesActions.addItem(note))
            })
            setIsLoading(false);
        }catch(err){
            console.log('Erro in fetching: ', err)
        }
    }

    useEffect(()=>{
        fetchNotes();

        return(()=>{
            dispatch(notesActions.clearData())
        })
    }, [])

    notes = pinnedNotes.length > 0 ? notes.filter(item => !(pinnedNotes.map(item => item.id)).includes(item.id)) : notes;

    useEffect(() => {
        const temp = notes.filter(item => {
            let content = ''; // The following check is for taking checked list items also in consideration for searching
            if(Array.isArray(item.description)){
                item.description.forEach(desc => content = content + ' ' + desc.task)
            }else{
                content = item.description || '';
            }
            return item.title?.toLowerCase().includes(searchTerm) || content.toLowerCase().includes(searchTerm)
        });
        setFilteredNotes(temp);
        console.log(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, isOpen])

    const createNewNote = () => {
        dispatch(notesActions.toggleModal(true));
    }

    return(
        <div className="mt-3 ml-10 w-5/6">
            <div className='flex justify-between items-center'>
                <Button variant='outlined' onClick={createNewNote}>+ Create new note</Button>
                <SearchField />
            </div>
           {isOpen && <NoteModal />}
           {isLoading && <p>LOADING .........</p> }
            {(pinnedNotes.length > 0 && !searchTerm) && <>
                <h2 className='font-extrabold mt-2.5 pl-1.5 border-b-2'>Pinned Notes </h2>
                <div className='grid grid-cols-3 gap-10'>
                 {pinnedNotes.map(({id, description, title, dateModified, isPinned}) => 
                    <NoteCard 
                        title={title} 
                        description={description} 
                        id={id}
                        key={id}
                        dateModified={dateModified}
                        isPinned={isPinned}
                    />)
                  }
                </div>
                <h2 className='font-extrabold mt-2.5 pl-1.5 border-b-2'>Others</h2>
                </>
            }
            {!isListView ? 
            <div className='grid grid-cols-3 gap-10 mt-10'>
                    {(!searchTerm ? notes : filteredNotes).map(({id, description, title, dateModified, isPinned}) => 
                    <NoteCard 
                        title={title} 
                        description={description} 
                        id={id}
                        key={id}
                        dateModified={dateModified}  
                        isPinned={isPinned}  
                    />)
                    }
            </div> :
            <div className='mt-10 w-inherit'>
                {(!searchTerm ? notes : filteredNotes).map(({id, description, title, dateModified}) => 
                    <ListView 
                        title={title} 
                        description={description} 
                        id={id} 
                        dateModified={dateModified} 
                        key={id} 
                    />)
                }
            </div>}
        </div>
    )
}