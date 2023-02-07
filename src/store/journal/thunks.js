import { collection, doc, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addEmpyNote, savingNewNote, setActiveNote, setActiveNoteImages, setNotes, setSaving, updateNote } from "./journalSlice";



export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        };

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notas` ) );
        await setDoc( newDoc, newNote);
        
        newNote.id = newDoc.id;

        dispatch( addEmpyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );    
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('No existe UID de usuario');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSavingNote = () => {
    
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const { activeNote } = getState().journal;
        const { uid } = getState().auth;

        const newNote = { ...activeNote };
        delete newNote.id;

        if( !activeNote.url){
            delete newNote.url;
        }

        const firestoreDoc = doc( FirebaseDB, `${ uid }/journal/notas/${ activeNote.id }`);
        await setDoc( firestoreDoc, newNote,{ merge: true});
        
        dispatch( updateNote( activeNote ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload( file ) ); 
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setActiveNoteImages( photosUrls ) );
        console.log('uploaded')      
    }
}