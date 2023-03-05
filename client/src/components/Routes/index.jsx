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

const index = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/1-bed-apartement" element={<Villa_1_bed />} />
        <Route path="/2-bed-villa" element={<Villa_2_bed />} />
        <Route path="/3-bed-villa" element={<Villa_3_bed />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/explore-zanzibar" element={<Explore_zanzibar />} />
      </Routes>
    </div>
  );
};

export default index;
