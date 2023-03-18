const URL = "https://alimissoum.app.3wa.io/user/";

async function addUser(user) {
  try {
    const response = await fetch(`${URL}register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json ; charset=UTF-8",
      },
    });
    return response.json();
  } catch (e) {
    alert("Registration failed. Please try again later");
  }
}

async function login(user) {
  try {
    const response = await fetch(`${URL}login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export default {
  addUser,
  login,
};
