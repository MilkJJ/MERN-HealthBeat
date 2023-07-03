import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExercisesContextProvider } from './context/ExercisesContext'
import { WeathersContextProvider } from './context/WeatherContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExercisesContextProvider>
        <WeathersContextProvider>
        <App />
        </WeathersContextProvider>
      </ExercisesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);