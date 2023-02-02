import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routers/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = () => {
  return (
    <>
      <BrowserRouter>
        <AppTheme>
          <AppRouter />
        </AppTheme> 
      </BrowserRouter>
    </>
  )
}
