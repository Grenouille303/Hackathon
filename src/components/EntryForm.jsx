import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import "../styles/form_style.css";

export default function EntryForm() {
  const [formData, setFormData] = useState({
    site_url: "",
    site_name: "",
    site_username: "",
    site_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    try {
      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Erreur lors de la création du mot de passe :", err);
    }

    setFormData({
      site_url: "",
      site_name: "",
      site_username: "",
      site_password: "",
    });
    setShowPassword(false);
  };

  const isSubmitDisabled =
    !formData.site_username ||
    !formData.site_password ||
    !formData.site_name ||
    !formData.site_url;

  return (
    <>
      <h1 className="text-center p-2">Ajouter un nouveau mot de passe </h1>
      <form onSubmit={handleSubmit} className="form pb-2">
        <input
          className="form_input"
          name="site_url"
          type="text"
          value={formData.site_url}
          onChange={handleChange}
          placeholder="URL du site"
          required
        />

        <input
          className="form_input"
          name="site_name"
          type="text"
          value={formData.site_name}
          onChange={handleChange}
          placeholder="Nom du site"
          required
        />

        <input
          className="form_input"
          name="site_username"
          type="text"
          value={formData.site_username}
          onChange={handleChange}
          placeholder="Identifiant sur le site"
          required
        />

        <div className="password-wrapper">
          <input
            className="form_input"
            name="site_password"
            type={showPassword ? "text" : "password"}
            value={formData.site_password}
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
