import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async() => {
       try {
       await axios.post('http://localhost:5000/api/signup', {name, email:mail, password})
       console.log('signup successfull')
       navigate('/')
       } catch (error) {
        throw new Error(error)
       }
    };

  return (
    <div>
    <p>Signup here</p>

    <label htmlFor='name'>
      <p>Name:</p>
      <input type='text' inputMode='text' placeholder='username here'
             name='name'     value={name} onChange={e => setName(e.target.value)}
      />
    </label>
    <label htmlFor='email'>
      <p>Email:</p>
      <input type='email' inputMode='email' placeholder='Email here'
         name='email' value={mail} onChange={e => setMail(e.target.value)}
      />
    </label>
    <label htmlFor='password'>
      <p>Password:</p>
      <input type='text'  placeholder='password here'
         name='password' value={password} onChange={e => setPassword(e.target.value)}
      />
    </label> <br /> <br />

    <button onClick={handleSignup}>
      Signup
    </button>
  </div>
  )
}

export default Signup
