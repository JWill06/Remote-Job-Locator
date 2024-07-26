import '../Styling/App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage';
import Header from './Header';
import ApiCall from './ApiCall';
import { useEffect } from 'react';
import Postings from './Postings';

function App() {

useEffect(() => {

})

  return (
    <div className="App-container">
        <Header />
      <div className='contentWrapper'>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/postings' element={<Postings />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
