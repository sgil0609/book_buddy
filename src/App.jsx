import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Books from './components/Books'; 
import BookDetails from './components/BookDetails';
import Checkout from './components/Checkout';
import Account from './components/Account';
 import Return from './components/Return';
 import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} /> 
        <Route path="/book-details/:bookId" element={<BookDetails />} />
        <Route path="/checkout/:bookId" element={<Checkout />} />
        <Route path="Account" element={<Account />} />
        <Route path="/return" element={<Return />} />
      </Routes>
    </Router>
  );
}

export default App;
