import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useState } from 'react';
import logo from '../../assets/logo.jpg';

function InputForm({isShowLoginForm, onSignUp, onNext}) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(prev => !prev)
    }

  return (
    <div className='grid grid-cols-2 border-2 rounded-2xl m-auto mt-35 h-100 w-300 p-10 ' >
      <div className=''>
        <img src={logo} alt='Take Notes' className='h-40 ml-10 mt-20'/>
      </div>
      <form className='flex flex-col justify-between gap-0.5 p-5 '>
          <label className='text-2xl'>Login to your account</label>
          <TextField 
            id="username" 
            label="Username" 
            variant="outlined" 
            sx={{marginTop: '10px', backgroundColor: 'white', borderRadius: '8px'}}
          />
          <TextField 
            id="password" 
            label="Password" 
            variant="outlined" 
            type={showPassword ? 'text' : 'password'}
            sx={{marginTop: "20px", backgroundColor: 'white', borderRadius: '8px'}}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">
                  <IconButton edge='end' onClick={toggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>,
              },
            }}             
          />
          <div className='flex justify-between'>
            {isShowLoginForm && <Button variant='outlined' onClick={onSignUp}>Sign Up</Button>}
            <Button 
              variant='outlined'
              onClick={onNext}
            >
              {isShowLoginForm ? 'Sign In' : 'Create an account'}
            </Button>
          </div>
      </form>
    </div>
  )
}

export default InputForm