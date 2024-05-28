import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import styles from './detail.module.css'
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import axios from 'axios';
const PropertyDetails = () => {
    const[details, setDetails] = useState({});
    const[ownerDetails, setOwnerDetails] = useState({});
    const[showOwner, setShowOwner] = useState(false)
    const[userToken, setUserToken] = useState('')
    const[newuser, setNewUser] = useState({})
    const location = useLocation();
    const navigate = useNavigate();
    const editHandler = () =>{
        navigate('/postProperty',{state:details})
    }
   
    const getOwnerDetails = async () =>{
      if(userToken === ''){
        navigate("/login")
        alert('Please login for owner details')
      }
        const res =await axios.get(`https://renify-real-estate-app.onrender.com/api/user/${details.owner}`
        ,{
          headers:{
            'Authorization':`${userToken}`
          }
        })
        console.log(res)
        setOwnerDetails(res.data)
        setShowOwner(true)
    }
    const deleteProperty = async() =>{
        try {
            await axios.delete(`https://renify-real-estate-app.onrender.com/api/property/${details._id}`
            ,{
              headers:{
                'Authorization':`${userToken}`
              }
            }
          ); 
          alert('Property deleted successfully');
          } catch (error) {
            alert('Error in deleting property');
            console.log(error)
          }
    }
useEffect(() =>{
    // console.log(location)
    const access_token = JSON.parse(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem("user"))
    if(access_token !== null){
      setUserToken(access_token)
    }
    if(user !== null){
      setNewUser(user)
    }
if(location.state !== null){
    const property = location.state;
    console.log(property)
    setDetails(property)
}
},[])
  return (
    <div>
        <div className={styles.container}>
            <div className={styles.col1}>
                <img src={details.imageUrl} />
            </div>
            <div className={styles.col2}>
                <div  className={styles.title}>
                <h2>{details.title}</h2>
                {newuser._id === details.owner ? (<>
                    <GrEdit onClick={editHandler} style={{marginTop:"6px",fontSize:"22px"}}/><MdDelete onClick={deleteProperty} style={{marginTop:"4px",fontSize:"25px"}}/>
                </>) : ('')}
                
                </div>

                <h3>{details.description}</h3>
                <div  className={styles.textContent}>
                    <div  className={styles.leftText}>
                        <p>Area</p>
                        <p>Bedrooms</p>
                        <p>Bathrooms</p>
                        <p>Near By Hospitals</p>
                        <p>Near By Colleges</p>
                        <p>Price</p>
                        <p>Location</p>
                        <p>City</p>
                    </div>
                    <div  className={styles.rightText}>
                    <p>{details.area}</p>
                    <p>{details.bedrooms}</p>
                    <p>{details.bathrooms}</p>
                    <p>{details.nearbyHospitals}</p>
                    <p>{details.nearbyColleges}</p>
                    <p>{details.price}</p>
                    <p>{details.location}</p>
                    <p>{details.city}</p>
                    </div>
                </div>
                {newuser._id !== details.owner ? (<button className={styles.intBtn} onClick={getOwnerDetails}>I'm Interested</button>) : ('')}
               {(userToken !== '' && showOwner) ? (<>
                <h3>Owner Details</h3>
                <div  className={styles.textContent}>
                    <div  className={styles.leftText}>
                        <p>First Name</p>
                        <p>Last Name</p>
                        <p>Email</p>
                        <p>Phone no</p>
                    </div>
                    <div  className={styles.rightText}>
                    <p>{ownerDetails.firstName}</p>
                    <p>{ownerDetails.lastName}</p>
                    <p>{ownerDetails.email}</p>
                    <p>{ownerDetails.phoneNumber}</p>
                    
                    </div>
                </div>
               </>) : ('')  }
               
            </div>
        </div>
    </div>
  )
}

export default PropertyDetails