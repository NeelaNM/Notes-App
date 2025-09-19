import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import NotesSection from '../NotesSection';
import InputForm from '../InputForm';
import { notesActions } from '../../store';

function LoginForm() {

  const [isShowLoginForm, setIsShowLoginForm] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const onSignUp = () => {
    setIsShowLoginForm(prev => !prev)
  }

  const onNext = () => {
    if(!isShowLoginForm){
      console.log('Account created! Now Login to your account')
      setIsShowLoginForm(true)
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
          <NotesSection />
        </>
      }     
     </>
  )
}

export default LoginForm;

