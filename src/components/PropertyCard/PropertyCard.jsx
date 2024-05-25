import React from 'react';
import styles from './card.module.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const PropertyCard = ({data}) => {
    const navigate = useNavigate();
    const goToDetails = () =>{
        navigate('/propertyDetails', {state:data})
    }
  return (
    <div className={styles.card} >
        <img src={data.imageUrl} alt={data.title} onClick={goToDetails} />
        <h5>{data.title}</h5>
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