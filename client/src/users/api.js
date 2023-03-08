const URL = "https://alimissoum.app.3wa.io/";

async function addUser(user) {
  try {
    const results = await fetch(`${URL}register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json ; charset=UTF-8",
      },
    });
    return results.json();
  } catch (err) {
    console.log(err);
  }
}

export default {
  addUser,
};
