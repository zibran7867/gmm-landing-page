import React from 'react'
import { useNavigate,  } from 'react-router-dom'
import Button from '@mui/material/Button';
const Other = () => {
    const navigate = useNavigate();

  const handlefpe = () => { navigate('/fpe') }
  const handleprv = () => { navigate('/prv') }
  const handleevp = () => { navigate('/se') }
  const handlevsp = () => { navigate('/svs') }

  const handleSignup = () => { navigate('/gmm/sign') }
  const handleLogin = () => { navigate('/gmm/login') }
  const handlefp = () => { navigate('/gmm/fp') }
  return (
    <div className ='h-screen flex flex-col items-center hatch justify-center'>
      <div className='flex flex-col gap-2 mt-10 '>
            <Button variant='contained' onClick={handlefpe}>Forgot Password Email</Button>
            <Button variant='contained' onClick={handleprv}>Password Reset Verification</Button>
        </div>

        <div className='flex flex-col gap-2 mt-10 '>
            <Button variant='contained' onClick={handleevp}>Email Varification Page</Button>
            <Button variant='contained' onClick={handlevsp}>Verification Success Page</Button>
        </div>
        <div className='flex flex-col gap-2 mt-10 '>
            <Button variant='contained' color='secondary' onClick={handleSignup}>Sign Up</Button>
            <Button variant='contained' color='secondary' onClick={handleLogin}>Log In</Button>
            <Button variant='contained' color='secondary' onClick={handlefp}>Forgot Password</Button>
        </div>
    </div>
  )
}

export default Other
