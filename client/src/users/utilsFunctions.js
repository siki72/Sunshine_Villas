const userURL = "https://alimissoum.app.3wa.io/user/";
const adminURL = "https://alimissoum.app.3wa.io/admin/";

async function addUser(user) {
  try {
    const response = await fetch(`${userURL}register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json ; charset=UTF-8",
      },
    });

    return response;
  } catch (e) {
    alert("Registration failed. Please try again later");
  }
}

async function login(user) {
  try {
    const response = await fetch(`${userURL}login`, {
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
async function handleBookTable(guest) {
  try {
    const response = await fetch(`${adminURL}walima`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(guest),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
async function fetchUserDatas(a) {
  try {
    const response = await fetch(`${userURL}` + a, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
async function fetchAdminDatas(a) {
  try {
    const response = await fetch(`${adminURL}` + a, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
async function deleteDatas(a) {
  try {
    const response = await fetch(`${adminURL}users/` + a, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
async function updateUserRole(body) {
  try {
    const response = await fetch(`${adminURL}users/role/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
/* const registerUser = (e) => {
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
 */
export default {
  addUser,
  login,
  getFormData,
  handleBookTable,
  fetchAdminDatas,
  fetchUserDatas,
  deleteDatas,
  updateUserRole,
};
