import axios from 'axios'
import React, { useEffect, useState, } from 'react'
axios.defaults.withCredentials = true;

let firstRender = true;
const Welcome = () => {
    const [user, setUser] = useState(null)
    // console.log(user)

    const refreshToken = async () => {
      try {
       const res =await axios.get("http://localhost:5000/api/refresh", {
         withCredentials:true
       })
       const data = res.data
       setUser(data.user)
      } catch (error) {
       return console.log(error)
      }
     }

    const getUsers = async () => {
     try {
      const res =await axios.get("http://localhost:5000/api/user", {
        withCredentials:true
      })
      const data = res.data
      setUser(data.user)
     } catch (error) {
      return console.log(error)
     }
    }

    useEffect(() => {
      if(firstRender){
        firstRender = false
        getUsers()
      }
      let interval = setInterval(() => {
        refreshToken()
      },1000 *  40)

      return () => clearInterval(interval)

    },[])
    
  return (
    <div>
      <p>welcome</p>
      <h1>{user && user.name}</h1>
      <h2>{user && user.email}</h2>
    </div>
  )
}

export default Welcome
