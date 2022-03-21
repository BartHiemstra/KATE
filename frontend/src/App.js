import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/header/navbar.component';
import Home from './components/home.component';
import './App.css';

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