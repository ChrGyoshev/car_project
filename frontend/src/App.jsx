import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Index from "./components/Index/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FetchLoggedUser } from "./services/api";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProfileDetails from "./components/Profile/ProfileDetails";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const isAuthenticated = await FetchLoggedUser(isLogged);
      setIsLogged(isAuthenticated.authenticated);
      setUser(isAuthenticated.data || "");
    }
    fetchUser();
  }, [isLogged]);

  const handleUpdateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  return (
    <>
      <BrowserRouter>
        <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />

        <Routes>
          <Route
            path="login"
            element={<Login onLogin={() => setIsLogged(true)} />}
          />
          <Route path="register" element={<Register />} />
          <Route
            path="/"
            element={<Index username={user.username} isLogged={isLogged} />}
          />
          <Route
            path="/user/details"
            element={
              <ProfileDetails user={user} onUpdateUser={handleUpdateUser} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
