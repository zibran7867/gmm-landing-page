import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate,  } from 'react-router-dom'
import Button from '@mui/material/Button';
const Layout = () => {


  return (
    <div className='h-screen hatch'>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
