import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import NotesSection from '../NotesSection';
import InputForm from '../InputForm';
import SideBarWrapper from '../SideBarWrapper'
import { notesActions } from '../../store';

function LoginForm() {

  const [isShowLoginForm, setisShowLoginForm] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const onSignUp = () => {
    setisShowLoginForm(prev => !prev)
  }

  const onNext = () => {
    if(!isShowLoginForm){
      console.log('Account created! Now Login to your account')
      setisShowLoginForm(true)
    } else{
      console.log('Sign in successful')
      dispatch(notesActions.setIsLoggedIn(true))
    }
  }

  return (
    <>
      {!isLoggedIn ? 
        <InputForm 
            isShowLoginForm={isShowLoginForm}
            onSignUp={onSignUp}
            onNext={onNext}
        /> :
        <> 
          <NavBar />
          <div className='flex justify-items-start gap-5 h-screen'>
            <SideBarWrapper />
            <NotesSection />
          </div> 
        </>
      }     
     </>
  )
}

export default LoginForm;

