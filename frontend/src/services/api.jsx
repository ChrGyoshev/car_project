const RegisterURL = "http://192.168.1.18:8000/api/register"; // use localhost if not using docker-compose
const LoginURL = "http://127.0.0.1:8000/api/login";

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
