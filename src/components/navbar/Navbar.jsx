import React, { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const[userToken, setUserToken] = useState('')
  const[userName, setUserName] = useState('')
  const navigate = useNavigate() 
    const logoutHandler = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.reload()
      navigate("/")
    }
    useEffect(() =>{
      const token = JSON.parse(localStorage.getItem("token"));
      const user = JSON.parse(localStorage.getItem("user"));
      if(token !== null){
        setUserToken(token)
      }
      if(user !== null){
        setUserName(user.firstName) 
      }
      
     
    },[userToken,userName])
  return (
    <div className={styles.nav}>
        <div className={styles.logo}>Renify</div>
        <div className={styles.navRight}>
            <div><Link to="/" >Home</Link></div>
            <div>About US</div>
            <div className={styles.navBtn} ><Link  to="/postProperty">Sell Property</Link></div>
            {userToken === '' ? (<>
              <div><Link to="/login">Login</Link></div>
              <div><Link to="/register">Register</Link></div>
            </>) : (<> <div>Welcome, {userName}</div><div onClick={logoutHandler} style={{cursor:"pointer"}}>Logout</div> </>)}
        </div>
    </div>
  )
}

export default Navbar