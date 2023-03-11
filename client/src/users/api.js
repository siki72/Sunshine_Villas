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
        /*         "Access-Control-Allow-Credentials": true, */
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
