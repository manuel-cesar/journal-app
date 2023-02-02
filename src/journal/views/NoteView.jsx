import { SaveOutlined } from '@mui/icons-material';
import { Grid, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
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
            <Typography fontSize={ 39 } fontWeight='light' >27 de enero de 2023</Typography>
        </Grid>

        <Grid item>
            <Button color='primary' sx={{ p: 2}}>
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
            />

            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='What happened today?'
                minRows='5'
            />

        </Grid>

        <ImageGallery />
    </Grid>
  )
}
