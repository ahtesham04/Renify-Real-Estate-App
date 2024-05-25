import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Registration = () => {
    const[formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        phoneNumber:''
    })
const navigate = useNavigate()
function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}
const validateInput = (data) =>{
  if(data.firstName.length<3){
    alert('First name must be at least 3 character')
    return false
  }else  if(data.lastName.length<3){
    alert('Last name must be at least 3 character')
    return false
  }else if(data.password.length<8){
    alert('Paaword must be at least 8 character')
    return false
  }else if(!emailIsValid(data.email)){
    alert('Email id must be correct id')
    return false
  }else if(data.phoneNumber.length<10){
    alert('Phone number must be 10 digit')
    return false
  }else{
    return true
  } 
}
    const handleChange = ({target}) =>{
        const{name,value} = target;
        setFormData(prevValue => ({...prevValue, [name]:value}))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const flag = validateInput(formData)
    if(flag){
        try {
          await axios.post(`http://localhost:8082/api/auth/register`, formData);
          alert('User added successfully');
          navigate('/login');
        } catch (error) {
          alert('Error in registration');
          console.log(error)
        }
      }
    };
    
  return (
    <div className={styles.container}>
       <h2>Register</h2>
       <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formgroup}>
        <label>First Name</label>
        <input className={styles.formInput} type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Last Name</label>
        <input type="text" className={styles.formInput} name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Email</label>
        <input type="text" className={styles.formInput} name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label className={styles.formgroup}>Password</label>
        <input type="text" className={styles.formInput} name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label className={styles.formgroup}>Phone Number</label>
        <input type="text" className={styles.formInput} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      
      <button type="submit" className={styles.btn}>Submit</button>
        </form>
    </div>
  )
}

export default Registration