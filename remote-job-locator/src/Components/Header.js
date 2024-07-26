import React from 'react'
// import { useState } from 'react'
import '../Styling/Header.css'
import remote from '../Assets/Remote3.png'

function Header() {

  return (
    <div className='headerWrapper'>
        <img src={remote} alt='logo'/>
        <h1>Find your dream remote job!</h1>
    </div>
  )
}

export default Header