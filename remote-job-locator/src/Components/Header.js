import React from 'react'
// import { useState } from 'react'
import '../Styling/Header.css'
import remote from '../Assets/Remote2.png'

function Header() {

  return (
    <div className='headerWrapper'>
        <img src={remote} alt='logo'/>
        <h1>Welcome to Remove Job Locator!</h1>
    </div>
  )
}

export default Header