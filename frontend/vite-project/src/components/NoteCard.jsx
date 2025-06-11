//import { deleteItem, toggleModal, setSelectedNote, setPinnedNotes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useState } from 'react';
import { notesActions } from '../store';
import axios from 'axios';

export default function NoteCard({ title, description, id, dateModified }) {

    
    const [showPinIcon, setShowPinIcon] = useState(false);
    
    const dispatch = useDispatch();
    // const isListView = useSelector(state => state.isListView);

    const trimDescription = (desc) => {
        const arr = desc.split(' ');
        if(arr.length > 30){
            return <p>{`${arr.slice(0, 30).join(' ')}  ....`}</p>
        }else{
            return <p>{desc}</p>
        }
    }
    
    const handleNoteSelect = () => {
        dispatch(notesActions.setSelectedNote({id, title, description, dateModified}))
        dispatch(notesActions.toggleModal(true));
    }

    const deleteNote = async (e, id) => {
        e.stopPropagation();
        const res = axios.delete(`/api/notes/${id}`);
        dispatch(notesActions.deleteItem(id))
    }

    const pinNote = (e) => {
        e.stopPropagation();
        dispatch(notesActions.togglePin());
        dispatch(notesActions.setPinnedNotes({id, title, description, dateModified}))
    }

    const displayNoteAsList = () => <div>
        {description.map((item, index) =>
            <li key={index} className='flex gap-1 justify-start items-center'>
                <input
                    type='checkbox'
                    defaultChecked={item.checked}
                    disabled
                    className='bg-amber-300'
                />
                {item.task}
            </li>)
        }
    </div>

    // const temp = <li>{title}</li>
    return(
        <div
            className='h-50 w-75 flex flex-col gap-0.5 rounded-xl p-1.5 mt-2.5 cursor-pointer overflow-y-auto bg-transparent text-inherit border-1 border-amber-100'
            onClick={handleNoteSelect}
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
                            <PushPinIcon onClick={(e) => pinNote(e)} />
                            <DeleteIcon onClick={(e) => deleteNote(e, id)} />
                        </span>
                    }
                </h4>
                {Array.isArray(description) ? displayNoteAsList() : trimDescription(description)}
            </div>
            <div
                className='text-xs font-extralight mt-auto'>
                {new Date(dateModified).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
        </div>
    )
}