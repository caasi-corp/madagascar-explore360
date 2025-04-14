
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Toaster position="top-right" richColors closeButton />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
