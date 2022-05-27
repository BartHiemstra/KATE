import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.onload = function() {
  ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <App />
    </Suspense>
  </React.StrictMode>, 
  document.getElementById('root'));
}