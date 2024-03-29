import React from "react";
import Navigation from "../Navigation";
import { Route, Routes } from "react-router-dom";
import About from "../../pages/About";
import Home from "../../pages/Home";
import ExploreZanzibar from "../../pages/ExploreZanzibar";
import Footer from "../Footer";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { UserContextProvider } from "../../users/UserContext.jsx";
import Account from "../../pages/Account.jsx";
import ContactPage from "../../pages/ContactPage.jsx";
import Walima from "../../pages/Walima.jsx";
import Errorpage from "../../pages/Errorpage";
import Bookings from "../../pages/Bookings.jsx";
import CheckOutSuccess from "../CheckOutSuccess.jsx";

const index = () => {
  return (
    <div>
      <UserContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="villas/:slug/:id" element={<Bookings />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/walima" element={<Walima />} />
          <Route path="/explore-zanzibar" element={<ExploreZanzibar />} />
          <Route path="/account/" element={<Account />} />
          <Route path="/account/:pages" element={<Account />} />
          <Route path="/account/dashboard/:pages" element={<Account />} />
          <Route path="/checkout-succes" element={<CheckOutSuccess />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
};

export default index;
