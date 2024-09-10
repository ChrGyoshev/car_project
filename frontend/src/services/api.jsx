const RegisterURL = 'http://localhost:8000/api/register'

export async function registerUser(data) {
    try {
        const response = await fetch(RegisterURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    if (!response.ok){
        throw new Error(response.statusText);
    }
    return await response.json()
    } catch (error) {
        console.error("Post request failed", error)
    }
}