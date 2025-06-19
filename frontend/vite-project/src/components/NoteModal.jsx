import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import axios from "axios";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckListArea from "./CheckListArea";
import ButtonSave from "./ButtonSave";
import { notesActions } from "../store";


export default function NoteModal() {
    
    const [isCheckList, setIsCheckList] = useState(false);
    const notesRef = useRef();
    const titleRef = useRef();
    const checklistRef = useRef(null);
    const dispatch = useDispatch();
    const selectedNote = useSelector(state => state.selectedNote);

    const addNote = () => {
        let id = selectedNote?.id;
        const item = {
            id: id || v4(),
            title: titleRef.current?.value,
            description: notesRef.current?.value,
        }
        if(id){
            dispatch(notesActions.editItem(item, id));
            try{
                axios.put(`/api/notes/${id}`, item)
            }catch(err){
                console.log("Error in sending request: ", err)
            }
        }
        if((item.title || item.description) && !id) {
            axios.post('/api/notes', item)
            dispatch(notesActions.addItem(item))
        }
        dispatch(notesActions.toggleModal(false))
        dispatch(notesActions.setSelectedNote({}))
    }

    const onCheckListClick = () => {
        setIsCheckList(prev => !prev);
    }

    const textArea = <>
        <textarea
            ref={notesRef}
            defaultValue={selectedNote?.description || ''}
            className="text-sm h-70 outline-0 border-0 pl-2.5"
        >    
        </textarea>
    </>
    
    const handleSave = () => {
        if (isCheckList || Array.isArray(selectedNote?.description)) {
            checklistRef?.current.onSave();
        } else {
            addNote();
        }
    }


    return(
        <dialog className='h-100 w-100 ml-auto mr-auto p-5 rounded-xl flex flex-col gap-2.5 backdrop-blur-3xl'>
            <input
                type='text'
                placeholder='Title'
                ref={titleRef}
                defaultValue={selectedNote?.title || ''}
                className='text-3xl outline-0 border-0'
            />
            <ChecklistIcon
                onClick={onCheckListClick}
                color={isCheckList ? "primary" : ''}
                className="bg-black"
            />
            {(isCheckList || Array.isArray(selectedNote?.description)) ?
                <CheckListArea
                    id={selectedNote?.id}
                    title={titleRef?.current?.value || selectedNote?.title}
                    description={selectedNote?.description}
                    ref={checklistRef}
                />
                : textArea}
            <ButtonSave onSave={handleSave} >Save</ButtonSave>
        </dialog>
    )
}
