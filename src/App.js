import logo from "./logo.svg";
import "./App.css";
import PostProperty from "./components/post property/PostProperty";
import Registration from "./components/registration/Registration";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./pages/HomePage/Home";
import PropertyDetails from "./pages/PropertyDetailsPage/PropertyDetails";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      {/* <PostProperty /> */}
      {/* <Registration /> */}
      <Navbar />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postProperty" element={<PostProperty />} />
        <Route path="/propertyDetails" element={<PropertyDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
