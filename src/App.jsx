import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Account from './components/Account'; // Import the MyAccount component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} /> 
      </Routes>
    </Router>
  );
}

export default App;
