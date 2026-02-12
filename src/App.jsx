import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./pages/index.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Petite triche on a pas accès à index sans connexion et une redirection est faite instantanément  */}
        {/* Si on est toujours connecté on aura directement l'index (soit le "profil") par exemple lors d'un refresh */}
        <Route path="/" element={<Index />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/index" element={<Index />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
