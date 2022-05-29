import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './i18n'
import './App.css';

import Home from './presentation/home.component';

function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;