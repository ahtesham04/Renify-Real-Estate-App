const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  nearbyHospitals: { type: String, required: true },
  nearbyColleges: { type: String, required: true },
  imageUrl: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = { Property };