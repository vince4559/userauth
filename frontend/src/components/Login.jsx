import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'

const Login = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

   
    const sendLoginReg = async() => {
        try {
        await axios.post('http://localhost:5000/api/login', { email:mail, password})
        console.log('login successfull')
        navigate('/user')
        } catch (error) {
         throw new Error(error)
        }
     };

     const handleLogin = () =>{
      sendLoginReg().then(() => dispatch(authActions.login()))
     }

  return (
    <div>
      <p>Login here</p>
      <label htmlFor='email'>
        <p>Email:</p>
        <input type='email' inputMode='email' placeholder='Email here'
           name='email' value={mail} onChange={e => setMail(e.target.value)}
        />
      </label>
      <label htmlFor='password'>
        <p>Password:</p>
        <input type='text' inputMode='email' placeholder='Email here'
            name='password' value={password} onChange={e => setPassword(e.target.value)}
        />
      </label> <br /> <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default Login
