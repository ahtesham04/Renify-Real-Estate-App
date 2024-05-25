const { Property } = require("../models/property.model");

const getAllProperties = async () => {
  return Property.find();
};

const uploadProperty = async (
  owner,
  title,
  description,
  price,
  area,
  bedrooms,
  bathrooms,
  nearbyHospitals,
  nearbyColleges,
  imageUrl,
  city,
  location
) => {
  const property = new Property({
    owner,
    title,
    description,
    price,
    area,
    bedrooms,
    bathrooms,
    nearbyHospitals,
    nearbyColleges,
    imageUrl,
    city,
    location,
  });

  await property.save();
  return property;
};
const editProperty = async (
  id,
  owner,
  title,
  description,
  price,
  area,
  bedrooms,
  bathrooms,
  nearbyHospitals,
  nearbyColleges,
  imageUrl,
  city,
  location
) => {
  let property = await Property.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title,
        description,
        price,
        area,
        bedrooms,
        bathrooms,
        nearbyHospitals,
        nearbyColleges,
        imageUrl,
        city,
        location,
      },
    },
    { new: true, useFindAndModify: false }
  );
  console.log(property);
  // const newProperty = await property.save();
  return property;
};

const removeProperty = async (id) => {
  const res = await Property.findByIdAndDelete({ _id: id });
  return res;
};
module.exports = {
  getAllProperties,
  uploadProperty,
  editProperty,
  removeProperty,
};
