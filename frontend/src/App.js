import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar.component';
import Home from './components/home.component';
import HomeTemp from './components/home_temp.component';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' exact element={<HomeTemp />} />
        </Routes>
    </Router>
  );
}

export default App;