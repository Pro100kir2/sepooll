import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { RoomsProvider } from './contexts/RoomsContext';
import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RoomsProvider>
          <App />
        </RoomsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);