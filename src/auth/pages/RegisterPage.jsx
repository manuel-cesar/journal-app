import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPass } from '../../store/auth/thunks';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo no es valido'],
  password: [ (value) => value.length > 7, 'La contrasena debe tener al menos 8 caracteres'],
  displayName: [ (value) => value.length > 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status == 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid, 
  } = useForm( formData, formValidations );


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPass(formState) );

  };

  return (
    <AuthLayout title="Create Account" >

      <h3>FormValid { isFormValid ? 'Valid' : 'Incorrect'}</h3>

      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2}}>
            <TextField 
              label="Full Name" 
              tpye="text" 
              placeholder="Manuel Cesar" 
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
            />              
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2}}>
            <TextField 
              label="Email" 
              tpye="email" 
              placeholder="manuel@gmail.com" 
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted}
              helperText={ emailValid }
            />              
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2}}>
            <TextField 
              label="Password" 
              tpye="password" 
              placeholder="password" 
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted}
              helperText={ passwordValid }
            />              
          </Grid>

          <Grid container spacing={ 2 } sx={{ m: 1 }}>

            <Grid
              item
              xs={ 12 }
              display={ !!errorMessage ? '' : 'none' } 
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={ 12 }>
              <Button
              disabled={ isCheckingAuthentication }
               type='submit'
                variant='contained' 
                fullWidth>
                Create User
              </Button>
            </Grid>


          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Have an account?</Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'>
              Login
            </Link>
          </Grid>
        </Grid>

      </form>
    </AuthLayout>
        
)}
