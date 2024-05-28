import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[formData, setFormData] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    
    const handleChange = ({target}) =>{
        const{name,value} = target;
        setFormData(prevValue => ({...prevValue, [name]:value}))
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
      if(formData.email === '' || formData.password === ''){
        alert('Please enter email and password')
      }
        try {
         const res = await axios.post(`https://renify-real-estate-app.onrender.com/api/auth/login`, formData);
         console.log(res,'user')
          alert('Logged in successfully');
          localStorage.setItem('token', JSON.stringify(res.data.tokens));
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/',{state:res.data});
        } catch (error) {
          alert('Enter valid Email or password');
          console.log(error)
        }
    }
  return (
    <div className={styles.container}>
    <h2>Login</h2>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
   
   <div className={styles.formgroup}>
     <label>Email</label>
     <input type="text" className={styles.formInput} name="email" value={formData.email} onChange={handleChange} required />
   </div>
   <div>
     <label className={styles.formgroup}>Password</label>
     <input type="text" className={styles.formInput} name="password" value={formData.password} onChange={handleChange} required />
   </div>
   
   
   <button type="submit" className={styles.btn}>Login</button>
     </form>
 </div>
  )
}

export default Login