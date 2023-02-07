import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Grid, TextField, Typography, Button, IconButton } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSavingNote, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
    
    const dispatch = useDispatch();

    const { activeNote , savedMessage, isSaving } = useSelector( state => state.journal );
    
    const  {body, title, date, onInputChange, formState, imageUrls = [] } =  useForm( activeNote );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
      if( savedMessage. length > 1) {
        Swal.fire('Nota actualizada', savedMessage, 'success');
      }    
    }, [savedMessage]);
    

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }
    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );
    }
    
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>

            <Grid item>

                <input
                type='file'
                ref={ fileInputRef }
                multiple
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    disabled ={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>


                <Button
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color='primary' 
                    sx={{ p: 2}}
                >
                    <SaveOutlined  sx={{ fontSize: 30, mr: 1 }}/>
                    Save
                </Button>
            </Grid>

            <Grid container>

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Write a title'
                    label='Title'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='What happened today?'
                    minRows='5'
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                />

            </Grid>

            <ImageGallery images={ activeNote.imageUrls} />
        </Grid>
  )
}
