import React from "react";
import Navigation from "../Navigation";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import About from "../../pages/About";
import Villas from "../../pages/Villas";
import Booking from "../../pages/Booking";
import Home from "../../pages/Home";
import Villa_1_bed from "../../pages/Villa_1_bed";
import Villa_2_bed from "../../pages/Villa_2_bed";
import Villa_3_bed from "../../pages/Villa_3_bed";
import Explore_zanzibar from "../../pages/Explore_zanzibar";
import Footer from "../Footer";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { UserContextProvider } from "../../users/UserContext.jsx";
import Account from "../../pages/Account.jsx";
import Admin from "../../pages/Admin.jsx";
import Contact_page from "../../pages/Contact_page.jsx";

const index = () => {
  return (
    <div>
      <UserContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/villas/:id" element={<Villa_1_bed />} />
          <Route path="/villas/:id" element={<Villa_2_bed />} />
          <Route path="/villas/:id" element={<Villa_3_bed />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact_page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore-zanzibar" element={<Explore_zanzibar />} />
          <Route path="/account/" element={<Account />} />
          <Route path="/account/:pages" element={<Account />} />
          {/*           <Route path="/account/dashboard" element={<Admin />} /> */}
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
};

export default index;
