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

function getFormData(refer, names = []) {
  const data = new FormData(refer.current);
  let newUser = {};
  for (let a of names) {
    newUser[a] = data.get(a);
  }
  return newUser;
}

const registerUser = (e) => {
  e.preventDefault();
  const data = new FormData(formRegisterRef.current);

  const newUser = {
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
    email: data.get("email"),
    password: data.get("password"),
  };

  userApi.addUser(newUser).then((resp) => {
    setRedirect(true);
  });
};

export default {
  addUser,
  login,
  getFormData,
};
