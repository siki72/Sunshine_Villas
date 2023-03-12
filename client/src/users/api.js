import { useState } from "react";

const URL = "https://alimissoum.app.3wa.io/";

async function addUser(user) {
  try {
    const results = await fetch(`${URL}register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json ; charset=UTF-8",
      },
    });
    return results.json();
  } catch (e) {
    alert("Registration failed. Please try again later");
  }
}

async function login(user) {
  try {
    const results = await fetch(`${URL}login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return results.json();
  } catch (e) {
    console.log(e);
  }
}

export default {
  addUser,
  login,
};

/* 
{user && numberOfnights > 0 ?:(
  <Link to={"/account/bookings"} className="button-book">
    {user ? "Book Now   " : "Login"}
    {numberOfnights > 0 ? (
      <>
        <button id="button" onClick={handleBooking}></button>
        <span> : {numberOfnights * villaInfos.price} €</span>
      </>
    ) : (
      ""
    )}
  </Link>
) : (
  <Link to={"/login"} className="button-book">
    <button id="button">{user ? "Book Now" : "Login"}</button>
  </Link>
)} 
 */
