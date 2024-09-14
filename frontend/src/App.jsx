import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Index from "./components/Index/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FetchLoggedUser } from "./services/api";
import { useEffect, useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      console.log("NavBar render - isLogged:", isLogged);
      await FetchLoggedUser(setIsLogged);
    }
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar isLogged={isLogged} />
        <Routes>
         
          <Route
            path="login"
            element={<Login onLogin={() => setIsLogged(true)} />}
          />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
