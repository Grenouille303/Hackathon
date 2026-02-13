import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext.jsx";
import "../styles/form_style.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Pour afficher les erreurs dans le formulaire
  const [showPassword, setShowPassword] = useState(false);

  const apiURL = "http://localhost:3000";
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset de l'erreur

    try {
      const res = await fetch(`${apiURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Erreur de connexion");
        return;
      }

      login(result.user, result.token);

      navigate("/index");
    } catch (err) {
      console.error(err);
      setError("Erreur réseau ou serveur");
    }
  };

  const isSubmitDisabled = !formData.email || !formData.password;

  return (
    <>
      <h1 className="text-center p-2">Connexion</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="form_input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <div className="password-wrapper">
          <input
            className="form_input"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Afficher le mot de passe"
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>
        {error && <p className="error">{error}</p>}{" "}
        {/* affichage de l'erreur */}
        <button
          type="submit"
          className="form_button"
          disabled={isSubmitDisabled}
        >
          Valider
        </button>
      </form>
    </>
  );
}
