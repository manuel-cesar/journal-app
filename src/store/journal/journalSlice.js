import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
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
        addEmpyNote: ( state, action ) => {

        },
        setActiveNote: ( state, action ) => {

        },
        setNotes: ( state, action ) => {

        },
        setSaving: ( state, action ) => {

        },
        updateNote: ( state, action ) => {

        },
        deleteNoteById: ( state, action ) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addEmpyNote,
    setActiveNote, 
    setNotes,
    setSaving, 
    deleteNoteById,
} = journalSlice.actions;