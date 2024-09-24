// const RegisterURL = "https://car-project-1-v5k4.onrender.com/api/register"; // use localhost if not using docker-compose
// const LoginURL = "https://car-project-1-v5k4.onrender.com/api/login";
// const LogOutURL = "https://car-project-1-v5k4.onrender.com/api/logout";
// const LoggedUserURL = "https://car-project-1-v5k4.onrender.com/api/user";
// const UserEditURL = "https://car-project-1-v5k4.onrender.com/api/edit";
// const DeleteProfileURL = "https://car-project-1-v5k4.onrender.com/api/delete";

// const GetUserCarsURL = "https://car-project-1-v5k4.onrender.com/api/cars/list"
// const AddCarURL = "https://car-project-1-v5k4.onrender.com/api/cars/create";

const RegisterURL = "http://127.0.01:8000/api/register"; // use localhost if not using docker-compose
const LoginURL = "http://127.0.0.1:8000/api/login"; // for run -dev -- --host (to be able to make call from devices in the same network)
const LogOutURL = "http://127.0.0.1:8000/api/logout";
const LoggedUserURL = "http://127.0.0.1:8000/api/user";
const UserEditURL = "http://127.0.0.1:8000/api/edit";
const DeleteProfileURL = "http://127.0.0.1:8000/api/delete";

const GetUserCarsURL = "http://127.0.0.1:8000/api/cars/list";
const AddCarURL = "http://127.0.0.1:8000/api/cars/create";

export async function registerUser(data) {
  try {
    const response = await fetch(RegisterURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    console.error("Post request failed", error);
    throw error;
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch(LoginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw responseData;
    }
    return responseData;

    return responseData;
  } catch (error) {
    console.error("Post request failed", error);
    throw error;
  }
}

export async function FetchLoggedUser(authenticated) {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(LoggedUserURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },

      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();

      return { authenticated: true, data }; // Use or store the user data as needed
    } else {
      console.error("Failed to fetch user data:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}

export async function EditUser(formData) {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(UserEditURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return { data, status: response.status };
    } else {
      console.error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteUser() {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(DeleteProfileURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
      credentials: "include",
    });
    if (response.ok) {
      return { status: response.status };
    } else {
      return { status: response.status };
    }
  } catch (error) {}
}

//  CARS APIS
export async function GetUserCars() {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(GetUserCarsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { status: response.status };
    }
  } catch (err) {
    console.log(err);
  }
}

export async function AddCar(data) {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(AddCarURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { status: response.status };
    }
  } catch (err) {
    console.error(err);
  }
}
