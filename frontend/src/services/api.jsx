const RegisterURL = "https://car-project-1-v5k4.onrender.com/api/register"; // use localhost if not using docker-compose
const LoginURL = "https://car-project-1-v5k4.onrender.com/api/login";
const LogOutURL = "https://car-project-1-v5k4.onrender.com/api/logout";
const LoggedUserURL = "https://car-project-1-v5k4.onrender.com/api/user";

// const RegisterURL = "http://127.0.01:8000/api/register"; // use localhost if not using docker-compose
// const LoginURL = "http://127.0.0.1:8000/api/login"; // for run -dev -- --host (to be able to make call from devices in the same network)
// const LogOutURL = "http://127.0.0.1:8000/api/logout";
// const LoggedUserURL = "http://127.0.0.1:8000/api/user";

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
