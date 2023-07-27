import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useSelector } from 'react-redux'

const Header = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <div >
      <h2>welcome to the man house</h2>
      <ul style={{display:'flex', gap:10,listStyle:'none' }}>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/signup'}>Signup</Link></li>
       {isLoggedIn &&  <li><Logout /></li>}
      </ul>
      
    </div>
  )
}

export default Header
