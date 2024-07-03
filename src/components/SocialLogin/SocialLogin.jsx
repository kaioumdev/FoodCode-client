import React from 'react'
import useAuth from '../../hooks/useAuth'
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
  return (
    <div className='flex justify-between p-2'>
        <FaGoogle></FaGoogle>
        <button onClick={signInWithGoogle}>SignInWithGoogle</button>
    </div>
  )
}

export default SocialLogin