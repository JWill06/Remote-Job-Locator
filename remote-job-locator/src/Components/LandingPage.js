import React from 'react'
import { Link } from 'react-router-dom'
import '../Styling/LandingPage.css'
import workingSpace from '../Assets/remoteWorking.jpg'

function LandingPage() {
  return (
    <div className='landingPageWrapper'>
      <div className='mainContent'>
        <h1>Looking for your next or first remote job?</h1>
        <h2>Click below to get started!</h2>
        <button className='postingsButton'>
          <Link className='allPostings' to='/postings'>Remote Job Postings</Link>
        </button>
      </div>
        </div>
  )
}

export default LandingPage