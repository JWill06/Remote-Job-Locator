import '../Styling/App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage';
import Header from './Header';
import { useEffect } from 'react';
import Postings from './Postings';
import Footer from './Footer';
import SinglePosting from './SinglePosting';
import SavedPostings from './SavedPostings';

function App() {


  return (
    <div className="App-container">
        <Header />
      <div className='itemWrapper'>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/postings' element={<Postings />}/>
        <Route path='/posting/:id' element={<SinglePosting />}/>
        <Route path='/SavedPostings' element={<SavedPostings />}/>
        <Route path='*' element='PAGE DOES NOT EXIST, TRY AGAIN!'/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
