import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropertyCard from '../PropertyCard/PropertyCard';
import styles from './property.module.css';
import locationIcon from '../../assets/Icon (4).png'
import sIcon from '../../assets/searchicon.png'

const Property = () => {
    const[properties, setProperties] = useState([]);
    const[city, setCity] = useState('')
    const[bedrooms, setBedrooms] = useState('')
    const[maxPrice, setMaxPrice] = useState('');
    const[filterData, setFilterData] = useState(properties)
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dataPerPage = 3;
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // console.log(TranscList);
  // useEffect(() => {
  //   getAllPropertyData()
  //   setTotalPages(filterData.length / 3);
  //   const indexOfLastData = currentPage * dataPerPage;
  // const indexOfFirstData = indexOfLastData - dataPerPage;
  // const currentData = filterData && filterData.slice(indexOfFirstData, indexOfLastData);
  //  setFilterData(currentData)
  // }, [currentPage]);
    const getAllPropertyData = async() =>{
      try {
        const res = await axios.get("http://localhost:8082/api/property")
        setProperties(res.data)
        setFilterData(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
       
    }
    useEffect(() =>{
      getAllPropertyData()
    },[])
const filterByCity = (properties,cityName) =>{
  let property = JSON.parse(JSON.stringify(properties))
  let newProperty = property.filter(item =>item.city === cityName);
  return newProperty
}
const filterByBedrooms = (properties,noOfBedrooms) =>{
  let property = JSON.parse(JSON.stringify(properties))
  let newProperty = property.filter(item =>item.bedrooms === noOfBedrooms);
  return newProperty
}
const filterByPrice = (properties,price) =>{
  let property =JSON.parse(JSON.stringify(properties))
  let newProperty = property.filter(item =>item.price <= price);
  return newProperty
}

    const searchHandler = () =>{
        if(city && bedrooms && maxPrice){
            let cityProp = filterByCity(properties,city);
            let bedroomProp = filterByBedrooms(cityProp,bedrooms);
            let filterredProperties = filterByPrice(bedroomProp,maxPrice)
            setFilterData(filterredProperties)
        }else if(city && bedrooms){
          let cityProp = filterByCity(properties,city);
          let bedroomProp = filterByBedrooms(cityProp,bedrooms);
          setFilterData(bedroomProp)
        }else if(city && maxPrice){
          let cityProp = filterByCity(properties,city);
          let filterredProperties = filterByPrice(cityProp,maxPrice)
          setFilterData(filterredProperties)
        }else if( bedrooms && maxPrice){
          let bedroomProp = filterByBedrooms(properties,bedrooms);
          let filterredProperties = filterByPrice(bedroomProp,maxPrice)
          setFilterData(filterredProperties)
        }else if(city){
          let cityProp = filterByCity(properties,city);
          setFilterData(cityProp)
        }else if(bedrooms){
          let bedroomProp = filterByBedrooms(properties,bedrooms);
          setFilterData(bedroomProp)
        }else if(maxPrice){
          let filterredProperties = filterByPrice(properties,maxPrice)
          setFilterData(filterredProperties)
        }else{
          setFilterData(properties)
        }
    }
  return (
    <>
     <div className={styles.searchContainer}>
        <div  className={styles.searchBox}>
            <div  className={styles.searchField}>
              <img src={locationIcon} alt='icon' className={styles.sIcon}/>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={styles.inputField} placeholder="Enter city"/>
            </div>
            <div  className={styles.searchField}>
              <img src={sIcon} alt='icon' className={styles.sIcon}/>
                <input type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={styles.inputField} placeholder="Enter No of bedrooms"/>
            </div>
            <div  className={styles.searchField}>
              <img src={sIcon} alt='icon' className={styles.sIcon} />
                <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={styles.inputField} placeholder="Max Price"/>
            </div>
            <button className={styles.searchBtn} onClick={searchHandler}>Search</button>
        </div>
</div>
    <div className={styles.row}>
        {filterData.length > 0 ? (filterData.map(item => <PropertyCard data={item}/>)) :('No Data Available')}
    </div>
    </>
  )
}

export default Property