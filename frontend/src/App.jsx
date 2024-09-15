import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Index from "./components/Index/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FetchLoggedUser } from "./services/api";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const [username, setUserName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const isAuthenticated = await FetchLoggedUser(isLogged);
      setIsLogged(isAuthenticated.authenticated);
      setUserName(isAuthenticated.data.email || "");
    }
    fetchUser();
  }, [isLogged]);

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
            element={<Index username={username} isLogged={isLogged} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
