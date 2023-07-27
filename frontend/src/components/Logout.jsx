import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';
axios.defaults.withCredentials = true

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sendLogOutReq = async() => {
      try {
        const res =  await axios.post('http://localhost:5000/api/logout', null, {
        withCredentials:true
       })
       if(res.status === 200){
         return res
       }
       
      } catch (err) {
        return console.log("Unable to Logout, Try again")
      }
    };

    const handleLogout = () => {
      sendLogOutReq().then(() => dispatch(authActions.logOut()))
      navigate('/login')
    }

  return(
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
