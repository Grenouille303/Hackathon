import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function EntriesList() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibilityMap, setVisibilityMap] = useState({}); // map id => visible ou pas

  // const entries = [
  //   //Test
  //   {
  //     site_url: "test@site",
  //     site_name: "Le nom du site",
  //     site_username: "JeSuisUnUser",
  //     site_password: "MotDePasseTrèsSecret",
  //   },
  //   {
  //     site_url: "test@site",
  //     site_name: "Le nom du site",
  //     site_username: "JeSuisUnUser",
  //     site_password: "MotDePasseTrèsSecret",
  //   },
  // ];

  useEffect(() => {
    const fetchEntries = async () => {
      if (!token) return setLoading(false);

      try {
        const res = await fetch("/api/vault", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Token invalide ou expiré");

        const data = await res.json();
        console.log(data);
        setEntries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [token]);

  const toggleVisibility = (id) => {
    setVisibilityMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <span className="loader"></span>;

  if (entries.length === 0)
    return <p className="text-center italic">Aucune entrée</p>;

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr key="en_tête">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              URL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SITE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              IDENTIFIANT
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              MOT DE PASSE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              MODIFIER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SUPPRIMER
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">
                      {entry.site_url}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{entry.site_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {entry.site_username}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                <span>
                  {visibilityMap[entry.id] ? entry.site_password : "********"}
                </span>

                <button
                  type="button"
                  onClick={() => toggleVisibility(entry.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {visibilityMap[entry.id] ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              </td>

              {/* Ici on pourra tout enlever et utiliser EntryRow */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Modifier
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <a href="#" className="ml-2 text-red-600 hover:text-red-900">
                  Supprimer
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
