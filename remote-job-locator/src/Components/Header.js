import React from 'react'
// import { useState } from 'react'
import '../Styling/Header.css'
import remote from '../Assets/Remote3.png'
import { NavLink, Link } from 'react-router-dom'

function Header() {

  return (
    <div className='headerWrapper'>
        <NavLink to='/'>
        <img src={remote} alt='logo'/>
        </NavLink> 
        <h1>Find your dream remote job!</h1>
        <div className='postingLinks'>
          <Link className='link1'to='/postings'>
          <p>All postings</p>
          </Link>
          <p className='slash'>/</p>
          <Link className='link2' to='/SavedPostings'>
          <p>Saved Postings</p>
          </Link>
        </div>
    </div>
  )
}

export default Header