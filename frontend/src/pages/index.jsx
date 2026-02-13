import { useState } from "react";
import EntryForm from "../components/EntryForm";
import EntriesList from "../components/EntriesList";

export default function Index() {
  const [addEntryForm, setAddEntryForm] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer ml-2 bg-linear-to-r from-yellow-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-green-600 transition-all transform hover:scale-105 shadow-lg"
        onClick={() => setAddEntryForm(!addEntryForm)}
      >
        {addEntryForm
          ? "Fermer le formulaire"
          : "Ajouter un nouveau mot de passe"}
      </button>

      {addEntryForm && <EntryForm />}
      <EntriesList />
    </>
  );
}
