import '../Styling/App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage';
import Header from './Header';
import { useEffect } from 'react';
import Postings from './Postings';
import Footer from './Footer';

function App() {

useEffect(() => {

})

  return (
    <div className="App-container">
        <Header />
      <div className='itemWrapper'>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/postings' element={<Postings />}/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
