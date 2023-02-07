import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        activeNote: null,
        // activeNote: {
        //     id: 'AAA111',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https//:image1.jpg,
        // }
        
    },
    reducers: {
        savingNewNote( state ) {
            state.isSaving = true;
        },
        addEmpyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.activeNote = action.payload;
            state.savedMessage = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state, action ) => {
            state.isSaving = true;
            state.savedMessage = '';
            //TODO: Msje de error
        },
        updateNote: ( state, action ) => { // payload: note
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id) return action.payload;

                return note;
            });

            state.savedMessage = `"${ action.payload.title}", actualizada correctamente`;
        },
        setActiveNoteImages: ( state, action ) => {
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        deleteNoteById: ( state, action ) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addEmpyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote, 
    setActiveNoteImages,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;