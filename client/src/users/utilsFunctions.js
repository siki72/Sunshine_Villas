async function addUser(user) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_USER}register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json ; charset=UTF-8",
      },
    });

    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_USER}register`,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}

async function login(user) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_USER}login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_USER}login`,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
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
    const response = await fetch(`${import.meta.env.VITE_URL_ADMIN}walima`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(guest),
    });
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_ADMIN}walima`,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}
async function fetchUserDatas(a) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_USER}` + a, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_USER}` + a,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}
async function fetchAdminDatas(a) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_ADMIN}` + a, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_ADMIN}` + a,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}
async function deleteDatas(a) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_ADMIN}users/` + a,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_ADMIN}users/` + a,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}
async function updateUserRole(body) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_ADMIN}users/role/`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_ADMIN}users/role/`,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}

async function editVillas(datas) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_ADMIN}datas/villas`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    return response;
  } catch (error) {
    const errorDatas = {
      url: `${import.meta.env.VITE_URL_ADMIN}datas/villas`,
      message: error.message,
      stackTrace: error.stack,
    };
    await sendErrorDatas(errorDatas);
  }
}

async function sendErrorDatas(error) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_LOG}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(error),
    });
    return response;
  } catch (e) {
    fetch(`${import.meta.env.VITE_URL_LOG}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(e),
    });
  }
}

export default {
  addUser,
  login,
  getFormData,
  handleBookTable,
  fetchAdminDatas,
  fetchUserDatas,
  deleteDatas,
  updateUserRole,
  editVillas,
  sendErrorDatas,
};
