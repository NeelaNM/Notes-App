import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isOpen: false,
    selectedNote: {},
    recentlyDeleted: [],
    isListView: false,
    isPinned: false,
    pinnedNotes: [],
    searchTerm: '',
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.unshift(action.payload)
        },
        deleteItem(state, action) {
            const filteredItems = state.items.filter(item => item.id !== action.payload)
            const deletedItem = state.items.filter(item => item.id === action.payload)
            state.items = filteredItems;
            state.recentlyDeleted.push(...deletedItem)
         
        },
        editItem(state, action) {
            const filteredItem = state.items.find(item => item.id === action.payload.id)
            filteredItem.title = action.payload.title;
            filteredItem.description = action.payload.description;
            filteredItem.dateModified = action.payload.dateModified;
        },
        toggleModal(state, action) {
            state.isOpen = action.payload
        },
        setSelectedNote(state, action){
            state.selectedNote = action.payload;
        },
        setPinnedNotes(state, action) {
           let temp = state.pinnedNotes.filter(item => item.id !== action.payload.id);
           state.pinnedNotes = state.isPinned ? [action.payload, ...state.pinnedNotes] : temp;
        },
        togglePin(state) {
            state.isPinned = !state.isPinned;
        },
        setSearchTerm(state, action){
            state.searchTerm = action.payload;
        }
    }
})

const store = configureStore({
    reducer: notesSlice.reducer
})

export const notesActions = notesSlice.actions;

export default store;