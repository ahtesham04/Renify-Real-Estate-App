import React, { useState } from 'react';
import styles from './card.module.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import axios from 'axios';
const PropertyCard = ({data}) => {
    const[likeCount, setLikeCount] = useState(data.like)
    const navigate = useNavigate();
    const goToDetails = () =>{
        navigate('/propertyDetails', {state:data})
    }
    const handleLikes = async() =>{
        try {
            const res = await axios.put(`https://renify-real-estate-app.onrender.com/api/property/${data._id}/likes`)
            console.log(res)
            // let filterData = res.data.find(elem => elem._id === data._id);
            setLikeCount(res.data.like)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={styles.card} >
        <img src={data.imageUrl} alt={data.title} onClick={goToDetails} />
        <div className={styles.title}>
        <h5>{data.title}</h5>
        <div> <AiFillLike style={{cursor:"pointer"}} onClick={handleLikes}/><span>{likeCount}</span></div>
        
        </div>
        
        <div className={styles.cardText} >
            <h6>Price</h6>
            <div style={{display:"flex"}}>
            <div><MdOutlineCurrencyRupee /></div><p>{data.price}</p>
            </div>
           
        </div>
        <div  className={styles.cardText}  >
            <h6>Area</h6>
            <p>{data.area} sqft</p>
        </div>
        <div  className={styles.cardText}  >
            <h6>{data.city}</h6>
            <p>{data.location}</p>
        </div>
       
    </div>
  )
}

export default PropertyCard