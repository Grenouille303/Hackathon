import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    username: "",
  });

  const [emailError, setEmailError] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const apiURL = "http://localhost:3000";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation mot de passe
  const validatePassword = (password) => {
    if (password.length > 30) return "Maximum 30 caractères autorisés.";
    if (password.length < 8) return "Minimum de 8 caractères requis.";
    if (!/[A-Z]/.test(password)) return "Une majuscule requise.";
    if (!/[0-9]/.test(password)) return "Un chiffre requis.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Au moins un caractère spécial requis.";
    return "";
  };

  const validateUsername = (username) => {
    if (!username) return ""; // optionnel
    if (username.length < 3) return "Minimum 3 caractères requis.";
    if (username.length > 20) return "Maximum 20 caractères autorisés.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Validation password
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
        confirm_password:
          formData.confirm_password && value !== formData.confirm_password
            ? "Les mots de passe ne correspondent pas."
            : "",
      }));
    }

    // Validation confirm password
    if (name === "confirm_password") {
      setErrors((prev) => ({
        ...prev,
        confirm_password:
          value !== formData.password
            ? "Les mots de passe ne correspondent pas."
            : "",
      }));
    }

    // Validation username
    if (name === "username") {
      setErrors((prev) => ({
        ...prev,
        username: validateUsername(value),
      }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (errors.password || errors.confirm_password) return;

    if (formData.password !== formData.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "Les mots de passe ne correspondent pas.",
      }));
      return;
    }

    try {


      // const submitData = new FormData();
      // submitData.append("first_name", formData.first_name);
      // submitData.append("last_name", formData.last_name);
      // submitData.append("email", formData.email);
      // submitData.append("password", formData.password);



      // if (formData.username) {
      //   submitData.append("username", formData.username);
      // }

      // if (formData.profile_picture) {
      //   submitData.append("profile_picture", formData.profile_picture);
      // }

      // const json = JSON.stringify(Object.fromEntries(submitData.entries()));

      // console.log(json);

      const res = await fetch(`${apiURL}/api/auth/register`, {
        //à changer
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // const result = await res.json();
      // console.log(result);

      if (res.ok) {
        navigate("/login");
      } else {
        setEmailError("Cet email est déjà utilisé, l'utilisateur existe déjà.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Bouton désactivé si erreurs ou champs requis vides
  const isSubmitDisabled =
    !formData.first_name ||
    !formData.last_name ||
    !formData.email ||
    !formData.password ||
    !formData.confirm_password ||
    !!errors.password || // !! converti le string en booléen
    !!errors.confirm_password ||
    !!errors.username;

  return (
    <>
      <h1 className="text-center p-2">Inscription</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form_input"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />

        <input
          className="form_input"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Nom"
          required
        />

        <input
          className="form_input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {emailError && <p className="error">{emailError}</p>}

        <div className="password-wrapper">
          <input
            className={
              errors.password ? "form_input error_input" : "form_input"
            }
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
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="password-wrapper">
          <input
            className={
              errors.confirm_password ? "form_input error_input" : "form_input"
            }
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label="Afficher la confirmation"
          >
            {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="error">{errors.confirm_password}</p>
        )}

        <input
          className="form_input"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur (optionnel)"
        />
        {errors.username && <p className="error">{errors.username}</p>}

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
};

export default RegisterForm;
