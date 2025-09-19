import { useDispatch } from "react-redux";
import axios from "axios";
import { notesActions } from "../store";

const useNoteActions = () => {

    const dispatch = useDispatch();

    const trimDescription = (desc) => {
        const arr = desc.split(' ');
        if(arr.length > 30){
            return <p>{`${arr.slice(0, 30).join(' ')}  ....`}</p>
        }else{
            return <p>{desc}</p>
        }
    }
    
    const handleNoteSelect = (id, title, description, dateModified) => {
        dispatch(notesActions.setSelectedNote({id, title, description, dateModified}))
        dispatch(notesActions.toggleModal(true));
    }

    const createNewNote = () => {
        dispatch(notesActions.toggleModal(true));
    }
    const deleteNote = async (e, id) => {
        e.stopPropagation();
        await axios.delete(`/api/notes/${id}`);
        dispatch(notesActions.deleteItem(id))
    }

    const pinNote = (event, id, title, description, dateModified, isPinned) => {
        event.stopPropagation();
        dispatch(notesActions.togglePin());
        dispatch(notesActions.setPinnedNotes({id, title, description, dateModified, isPinned}))
        const item = {
            id,
            title,
            description,
            dateModified,
            isPinned: !isPinned,
        }
        if(id){
            dispatch(notesActions.editItem(item, id));
            try{
                axios.put(`/api/notes/${id}`, item)
            }catch(err){
                console.log("Error in sending request: ", err)
            }
        }
    }

    const displayNoteAsList = (description) => <div>
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

    return {
        trimDescription,
        handleNoteSelect,
        createNewNote,
        deleteNote,
        pinNote,
        displayNoteAsList
    }
}

export default useNoteActions;