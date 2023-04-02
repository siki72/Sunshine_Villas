import React from "react";
import Navigation from "../Navigation";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import About from "../../pages/About";
import Home from "../../pages/Home";
import Villa_1_bed from "../../pages/Villa_1_bed";
import Explore_zanzibar from "../../pages/Explore_zanzibar";
import Footer from "../Footer";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { UserContextProvider } from "../../users/UserContext.jsx";
import Account from "../../pages/Account.jsx";
import Contact_page from "../../pages/Contact_page.jsx";
import Walima from "../../pages/Walima.jsx";
import Errorpage from "../../pages/Errorpage";

const index = () => {
  return (
    <div>
      <UserContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="villas/:slug/:id" element={<Villa_1_bed />} />
          <Route path="/contact" element={<Contact_page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/walima" element={<Walima />} />
          <Route path="/explore-zanzibar" element={<Explore_zanzibar />} />
          <Route path="/account/" element={<Account />} />
          <Route path="/account/:pages" element={<Account />} />
          <Route path="/account/dashboard/:pages" element={<Account />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
};

export default index;
