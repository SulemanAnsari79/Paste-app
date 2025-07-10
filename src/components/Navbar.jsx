import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row flex-wrap place-content-evenly text-4xl'>
      <Link
        to="/">
        Home

      </Link>
      <Link
        to="/Pastes"
      >
        Pastes
      </Link>
    </div>
  )
}

export default Navbar
