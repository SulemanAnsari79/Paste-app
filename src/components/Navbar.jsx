import React from 'react'
import {NavLink}  from 'react-router-dom'

const Navbar = () => {
  return ( 
    <div className='flex flex-row place-content-evenly text-4xl'>
      <NavLink
      to="/">
        Home
      
      </NavLink>
      <NavLink
      to="/Pastes"
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
