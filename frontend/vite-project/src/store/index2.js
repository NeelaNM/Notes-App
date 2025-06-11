import { createSlice } from '@reduxjs/toolkit';


import { createStore, compose } from 'redux'; 
import {
    ADD_ITEM,
    DELETE_ITEM,
    EDIT_ITEM,
    ADD_FOLDER,
    TOGGLE_MODAL,
    SET_SELECTED_NOTE,
    SET_FOLDER_ID,
    TOGGLE_VIEW,
    SET_PINNED_NOTES,
} from '../actions';

const INITIAL_DATA = 
  {
      id: 1,
      isFolder: true,
      tag: 'All Notes',
      items: [
          {
              id: 2,
              isFolder: true,
              tag: 'Personal',
              items: []
          },
          {
              id: 3,
              isFolder: true,
              tag: 'Work',
              items: []
          }
      ]
  }
const initialState = {
    items: [],
    folders: INITIAL_DATA,
    isOpen: false,
    selectedNote: {},
    selectedFolderId: null,
    recentlyDeleted: [],
    isListView: false,
    pinnedNotes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: 
            const filteredFolder = state.folders.items.filter(item => item.id === action.payload.folderId);
            filteredFolder[0]?.items.push(action.payload);
            const remFolders = state.folders.items.filter(item => item.id !== action.payload.folderId)
            return {
                ...state,
                items: [action.payload, ...state.items],
                folders: {
                    ...state.folders,
                    items: [...filteredFolder, ...remFolders],
                }
            }
        case DELETE_ITEM:
            const filteredItems = state.items.filter(item => item.id !== action.id)
            const deletedItem = state.items.filter(item => item.id === action.id)

            const fid = deletedItem[0].folderId;
            if (fid > 1) {
                let filteredFolderItems = state.folders.items.filter(item => item.id === fid);
                filteredFolderItems = filteredFolderItems[0].items.filter(item => item.id !== action.id);
                const temp = state.folders.items.filter(item => item.id !== fid)
                const temp2 = state.folders.items.filter(item => item.id === fid);
                temp2[0].items = filteredFolderItems;
            }
            return {
                ...state,
                items: filteredItems,
                folders: fid > 2 ? {...state.folders, items: [...temp, ...temp2]} : state.folders,
                recentlyDeleted: [...state.recentlyDeleted, ...deletedItem],
            }
        case EDIT_ITEM:
            const filteredItem = state.items.filter(item => item.id !== action.id)
            return {
                ...state,
                items: [action.payload, ...filteredItem]
            }
        case ADD_FOLDER:
            return {
                ...state,
                folders: {
                    ...state.folders,
                    items: [...state.folders.items, action.payload]
                }
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                isOpen: action.payload,
            }
        case SET_SELECTED_NOTE:
            return {
                ...state,
                selectedNote: action.payload,
            }
        case SET_FOLDER_ID:
            return {
                ...state,
                selectedFolderId: action.payload,
            }
        case TOGGLE_VIEW:
            return {
                ...state,
                isListView: !state.isListView,
            }
        case SET_PINNED_NOTES:
            let temp = state.pinnedNotes.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                pinnedNotes: action.payload.togglePin ? [action.payload, ...state.pinnedNotes] : temp,
            }
        default: return state;
    }
}


const store = createStore(
    reducer,
    initialState,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export default store;