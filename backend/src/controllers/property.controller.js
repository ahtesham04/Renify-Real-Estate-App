const {
  getAllProperties,
  uploadProperty,
  editProperty,
  removeProperty,
} = require("../services/property.service");

const getProperties = async (req, res) => {
  const properties = await getAllProperties();
  res.status(200).json(properties);
};

const addNewProperty = async (req, res) => {
  const {
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
  } = req.body;
  console.log(req, "property");
  const newProperty = await uploadProperty(
    req.user,
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
  );
  try {
    res.status(201).send("Property created");
  } catch (error) {
    res.status(400).send("Error creating property");
  }
};
const updateProperty = async (req, res) => {
  const {
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
  } = req.body;
  const { id } = req.params;
  const edittedProperty = await editProperty(
    id,
    req.user,
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
  );
  try {
    //   let property = await Property.findById(req.params.id);
    // if (!property) return res.status(404).json({ msg: "Property not found" });

    // if (property.user.toString() !== req.user.id)
    //   return res.status(401).json({ msg: "User not authorized" });

    res.status(201).send("Property editted");
  } catch (error) {
    res.status(400).send("Error editing property");
  }
};
const deleteProperty = async (req, res) => {
  console.log(req.params);
  try {
    const result = await removeProperty(req.params.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property" });
  }
};
module.exports = {
  getProperties,
  addNewProperty,
  updateProperty,
  deleteProperty,
};
