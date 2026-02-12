import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  // const isAuthenticated = false; //Test
  //   const isAuthenticated = true; //Test
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-gray-50">
        <section className="relative bg-linear-to-br from-purple-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Gestionnaire
                  <br />
                  Mots de passe
                </h1>
                {!isAuthenticated ? (
                  <p>
                    Gérer tous vos mots de passe au même endroit en quelques
                    clics !
                  </p>
                ) : (
                  <p>
                    {/* Bienvenue { !!user.username ? {user.first_name} {user.last_name} ! : {user.username} ! */}
                  </p>
                )}

                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4">
                    <button className="bg-linear-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-bold hover:from-pink-600 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg">
                      <Link to="/login">Connexion</Link>
                    </button>
                    <button className="bg-linear-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg">
                      <Link to="/register"> Inscription </Link>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4">
                    <button
                      className="bg-linear-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
                      onClick={handleLogout}
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <img
                    src="../../public/cybersecurite.png"
                    alt="Cyber sécurité"
                    className="relative z-10 w-full floating"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-50 to-transparent"></div>
        </section>
      </header>
    </>
  );
}
