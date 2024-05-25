import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './post.module.css';
const PostProperty = () => {
    const [property, setProperty] = useState({
        title: '',
        description: '',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: '',
        imageUrl:'',
        city:'',
        location:''
      });
      const[isEdit,setIsEdit] = useState(false)
      const[editId, setEditId] = useState(null)
      const location = useLocation();
      const access_token = JSON.parse(localStorage.getItem('token'));
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({ ...prev, [name]: value }));
      };
      useEffect(() =>{
        if(location.state !== null){
          setIsEdit(true)
          const updattedProperty = location.state;
          // setDetails(property)
          console.log(updattedProperty)
          setEditId(updattedProperty._id)
          setProperty({
            title: updattedProperty.title,
        description: updattedProperty.description,
        price: updattedProperty.price,
        area: updattedProperty.area,
        bedrooms: updattedProperty.bedrooms,
        bathrooms: updattedProperty.bathrooms,
        nearbyHospitals: updattedProperty.nearbyHospitals,
        nearbyColleges: updattedProperty.nearbyColleges,
        imageUrl:updattedProperty.imageUrl,
        city:updattedProperty.city,
        location: updattedProperty.location
          })
      }
      },[])
      const handleSubmit = async (e) => {
        e.preventDefault();
        // const token = localStorage.getItem('token');
        if (!access_token) {
          alert('You need to login first');
          return;
        }
    if(isEdit){
      try {
        await axios.put(`http://localhost:8082/api/property/${editId}`, property
        ,{
          headers:{
            'Authorization':`${access_token}`
          }
        }
      ); 
      alert('Property edited successfully');
      setProperty({
        title: '',
        description: '',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: '',
        imageUrl:'',
        city:'',
        location:''
      })
      } catch (error) {
        alert('Error in editing property');
        console.log(error)
      }
      
    }else{
        try {
          await axios.post(`http://localhost:8082/api/property/new`, property
          ,{
            headers:{
              'Authorization':`${access_token}`
            }
          }
        );
          alert('Property added successfully');
          setProperty({
            title: '',
            description: '',
            price: '',
            area: '',
            bedrooms: '',
            bathrooms: '',
            nearbyHospitals: '',
            nearbyColleges: '',
            imageUrl:'',
            city:'',
            location:''
          })
        //   history.push('/properties');
        } catch (error) {
          alert('Error adding property');
        }
      }
      };
  return (
    <div className={styles.container}>
      {isEdit ? ( <h2>Edit Your Property Details</h2>) : ( <h2>Fill Your Property Details</h2>)}
       
        <form  className={styles.formContainer}  onSubmit={handleSubmit}>
      <div className={styles.formgroup}>
        <label>Title</label>
        <input className={styles.formInput} type="text" name="title" value={property.title} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Description</label>
        <textarea className={styles.formInput} name="description" value={property.description} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Price</label>
        <input className={styles.formInput} type="number" name="price" value={property.price} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Area (sq ft)</label>
        <input className={styles.formInput} type="number" name="area" value={property.area} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Bedrooms</label>
        <input className={styles.formInput} type="number" name="bedrooms" value={property.bedrooms} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Bathrooms</label>
        <input className={styles.formInput} type="number" name="bathrooms" value={property.bathrooms} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Nearby Hospitals</label>
        <input className={styles.formInput} type="text" name="nearbyHospitals" value={property.nearbyHospitals} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Nearby Colleges</label>
        <input className={styles.formInput} type="text" name="nearbyColleges" value={property.nearbyColleges} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Image URL</label>
        <input className={styles.formInput} type="text" name="imageUrl" value={property.imageUrl} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>City</label>
        <input className={styles.formInput} type="text" name="city" value={property.city} onChange={handleChange} required />
      </div>
      <div className={styles.formgroup}>
        <label>Location</label>
        <input className={styles.formInput} type="text" name="location" value={property.location} onChange={handleChange} required />
      </div>
      <button  className={styles.btn} type="submit">Post Property</button>
    </form>
    </div>
  )
}

export default PostProperty