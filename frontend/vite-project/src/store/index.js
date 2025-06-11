import { createSlice, configureStore } from "@reduxjs/toolkit";
// const INITIAL_DATA = 
//   {
//       id: 1,
//       isFolder: true,
//       tag: 'All Notes',
//       items: [
//           {
//               id: 2,
//               isFolder: true,
//               tag: 'Personal',
//               items: []
//           },
//           {
//               id: 3,
//               isFolder: true,
//               tag: 'Work',
//               items: []
//           }
//       ]
//   }
const initialState = {
    items: [],
    //folders: INITIAL_DATA,
    isOpen: false,
    selectedNote: {},
    // selectedFolderId: null,
    recentlyDeleted: [],
    isListView: false,
    isPinned: false,
    pinnedNotes: [],
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addItem(state, action) {
            // const filteredFolder = state.folders.items.filter(item => item.id === action.payload.folderId);
            // filteredFolder[0]?.items.push(action.payload);
            // const remFolders = state.folders.items.filter(item => item.id !== action.payload.folderId)
            state.items.unshift(action.payload)
            // state.folders.items = [...filteredFolder, ...remFolders]
        },
        deleteItem(state, action) {
            const filteredItems = state.items.filter(item => item.id !== action.payload)
            const deletedItem = state.items.filter(item => item.id === action.payload)
            console.log('deleted: ', deletedItem);
            state.items = filteredItems;
            state.recentlyDeleted.push(...deletedItem)
         
        },
        editItem(state, action) {
            const filteredItem = state.items.find(item => item.id === action.payload.id)
            filteredItem.title = action.payload.title;
            filteredItem.description = action.payload.description;
            filteredItem.dateModified = action.payload.dateModified;
        },
        // addFolder(state, action) {
        //     state.folders.items.push(action.payload)
        // },
        toggleModal(state, action) {
            state.isOpen = action.payload
        },
        setSelectedNote(state, action){
            state.selectedNote = action.payload;
        },
        // setFolderId(state, action) {
        //     state.selectedFolderId = action.payload;
        // },
        setPinnedNotes(state, action) {
           let temp = state.pinnedNotes.filter(item => item.id !== action.payload.id);
           state.pinnedNotes = state.isPinned ? [action.payload, ...state.pinnedNotes] : temp;
        },
        togglePin(state) {
            state.isPinned = !state.isPinned;
        }
    }
})

const store = configureStore({
    reducer: notesSlice.reducer
})

export const notesActions = notesSlice.actions;

export default store;