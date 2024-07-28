import React from 'react'
import { Link } from 'react-router-dom'
import '../Styling/LandingPage.css'
import workingSpace from '../Assets/remoteWorking.jpg'

function LandingPage() {
  return (
    <div className='landingPageWrapper'>
        <h1>Looking for your next or first remote job?</h1>
        <h2>Here is an updated list of recently posted remote jobs.</h2>
        <h3>Click below to get started!</h3>
        <button className='postingsButton'>
          <Link className='allPostings' to='/postings'>Remote Job Postings</Link>
        </button>
        </div>
  )
}

export default LandingPage