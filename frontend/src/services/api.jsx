const RegisterURL = "http://192.168.1.18:8000/api/register"; // use localhost if not using docker-compose
const LoginURL = "http://127.0.0.1:8000/api/login";
const LogOutURL = "http://127.0.0.1:8000/api/logout";
const LoggedUserURL = "http://127.0.0.1:8000/api/user";

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
    const response = await fetch(LoggedUserURL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      authenticated(true); // Use or store the user data as needed
    } else {
      console.error("Failed to fetch user data:", response.statusText);
      authenticated(false);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    authenticated(false);
  }
}

export async function LogOut() {
  try {
    const response = await fetch(LogOutURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Error logout");
    }
  } catch (error) {
    console.log(error);
  }
}
