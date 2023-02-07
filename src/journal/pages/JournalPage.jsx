import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../../store/journal/journalSlice';
import { startNewNote } from '../../store/journal/thunks';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView } from '../views/NoteView';
import { NothingSelectedView } from '../views/NothingSelectedView';



export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, activeNote } = useSelector( state => state.journal );
  
  const onClickNewNote = () => {
    dispatch( startNewNote() );    
  }
  
  return (
    <JournalLayout>

      {
        ( !!activeNote )
        ? <NoteView />
        : <NothingSelectedView />    
      }
        

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        size='large'
        sx={{ 
          color: 'white', 
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30}} />

      </IconButton>

    </JournalLayout>
  )
}
