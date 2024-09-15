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
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const isAuthenticated = await FetchLoggedUser(isLogged);
      console.log(isAuthenticated.data.email);
      setIsLogged(isAuthenticated);
    }
    fetchUser();
  }, []);

  const Handler = async () => {
    const isAuthenticated = await FetchLoggedUser(isLogged);
    setEmail(isAuthenticated.data.email);
    console.log(isAuthenticated.data.email);
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
          <Route path="/" element={<Index />} />
        </Routes>
        <Button onClick={Handler}>Click me</Button>
        <h3> {email}</h3>
      </BrowserRouter>
    </>
  );
}

export default App;
