import React from 'react'
// import { useState } from 'react'
import '../Styling/Header.css'
import remote from '../Assets/Remote3.png'
import { NavLink } from 'react-router-dom'

function Header() {

  return (
    <div className='headerWrapper'>
      <NavLink to='/postings'>
        <img src={remote} alt='logo'/>
        </NavLink> 
        <h1>Find your dream remote job!</h1>
    </div>
  )
}

export default Header