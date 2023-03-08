import React from "react";
import Navigation from "../Navigation";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import About from "../../pages/About";
import Villas from "../../pages/Villas";
import Contact from "../../pages/contact";
import Booking from "../../pages/Booking";
import Home from "../../pages/Home";
import Villa_1_bed from "../../pages/Villa_1_bed";
import Villa_2_bed from "../../pages/Villa_2_bed";
import Villa_3_bed from "../../pages/Villa_3_bed";
import Explore_zanzibar from "../../pages/Explore_zanzibar";
import Footer from "../Footer";
import Login from "../../pages/Login";

const index = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/villa/1" element={<Villa_1_bed />} />
        <Route path="/villa/2" element={<Villa_2_bed />} />
        <Route path="/villa/3" element={<Villa_3_bed />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore-zanzibar" element={<Explore_zanzibar />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default index;
