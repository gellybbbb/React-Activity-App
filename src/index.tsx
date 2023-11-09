import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Components/Home'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const user = {}; // Replace {} with your initial user data if available
const setUser = () => {}; // Replace this with your setUser function

root.render(
  <React.StrictMode>
    <Home user={user} setUser={setUser} />
  </React.StrictMode>
);

reportWebVitals();
