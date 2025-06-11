export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const ADD_FOLDER = 'ADD_FOLDER';
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const SET_SELECTED_NOTE = 'SET_SELECTED_NOTE';
export const SET_FOLDER_ID = 'SET_FOLDER_ID';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';
export const SET_PINNED_NOTES = 'PINNED_NOTES';


export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item,
    }
}

export const addFolder = (item) => {
    return {
        type: ADD_FOLDER,
        payload: item,
    }
}

export const deleteItem = (id) =>{
    return{
        type: DELETE_ITEM,
        id
    }
}

export const editItem = (item, id) => {
    return{
        type: EDIT_ITEM,
        payload: item,
        id
    }
}

export const toggleModal = (payload) => {
    return {
        type: TOGGLE_MODAL,
        payload
    }
}

export const setSelectedNote = (item) => {
    return {
        type: SET_SELECTED_NOTE,
        payload: item
    }
}

export const setFolderId = (id) => {
    return {
        type: SET_FOLDER_ID,
        payload: id
    }
}

export const toggleView = () => {
    return {
        type: TOGGLE_VIEW,
    }
}

export const setPinnedNotes = (item) => {
    return {
        type: SET_PINNED_NOTES,
        payload: item,
    }
}
