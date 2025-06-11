import { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { v4 as uuid, v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { notesActions } from '../store';

export default function CheckListArea({ id = '', title, description = null, ref }) {

    const selectedNote = useSelector(state => state.selectedNote);

    const [checkListItems, setCheckListItems] = useState(description?.length || 1);
    const [existingList, setExistingList] = useState(description);
    const inputRefs = useRef([]);
    const checkedRefs = useRef([]);

    const checkListRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        inputRefs?.current[checkListItems - 1].focus();
    }, [])


    useImperativeHandle(ref, () => {
        return {
            onSave() {
                console.log('inside onSAve')
                //Convert the bulleted list items to an array of objects
                const taskItems = [];
                for (let i = 0; i < checkListItems; i++){
                    taskItems.push({
                        checked: checkedRefs.current[i].checked,
                        task: inputRefs.current[i].value
                    });
                }

                //Store the list items to redux
                const item = {
                    id: selectedNote?.id || v4(),
                    title: title || selectedNote?.title,
                    description: taskItems,
                    dateModified: Date.now(),
                }
                id ? dispatch(notesActions.editItem(item, id)) : ((item.description.length > 0 || title) && dispatch(notesActions.addItem(item)))
                dispatch(notesActions.toggleModal(false))
                dispatch(notesActions.setSelectedNote({}))
            }
        }
    })

    const handleKeyDown = (e, index) => {
        let temp = existingList ? [...existingList] : null;
        if (e.key === 'Enter') {
            setCheckListItems(prev => prev + 1);
            if (description?.length > 0) {
                temp.push([]);
                setExistingList(temp);
            }
        }
        if (e.key === 'Backspace' && checkListItems > 1 && inputRefs.current[index].value === '') {
            setCheckListItems(prev => prev - 1);
            inputRefs?.current[index].focus();
            if (description?.length > 0) {
                temp.pop();
                setExistingList(temp);
            }
        }
    }

    const handleCheckedItem = (index) => {
        inputRefs.current[index].style.textDecoration = 'line-through';

    }

    return (
        <div className='flex flex-col h-70 overflow-y-auto' ref={checkListRef}>
        {
            (existingList || [...Array(checkListItems)]).map((item, index) => <div className='flex gap-1.5 items-center' key={index}>
                <input
                    type='checkbox'
                    onChange={() => handleCheckedItem(index)}
                    ref={input => checkedRefs.current[index] = input}
                    defaultChecked={item?.checked}
                    className='h-5 w-5'
                />
                <input
                    type='text'
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={input => inputRefs.current[index] = input}
                    defaultValue={item?.task}
                    autoFocus
                    className='w-88 outline-0'
                />
            </div>)
            }
        </div>
    )
}