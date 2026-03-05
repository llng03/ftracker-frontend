import { useState } from "react";
import { addNewCategory } from "../../../api/costApi";
import { ModalShell } from "../../ModalShell";

export function AddCategoryModal({ showAddCategory, onSuccess }) {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addNewCategory(categoryName);
            setError(null);
            showAddCategory(false);
            onSuccess();

        } catch (err) {
            setError("Fehler beim Hinzufügen der Kategorie: " + err.message);
        }
    }

    return (
        <ModalShell onClose={() => showAddCategory(false)} >
            <form onSubmit={handleSubmit}>
                <h2>Neue Kategorie hinzufügen</h2>
                <div className="form-field">
                    <label htmlFor="categoryName">Kategorie Name:</label>
                    <input type="text" id="categoryName" onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
                </div>
                <button type="submit">Hinzufügen</button>
            </form>
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
        </ModalShell>
    )
}
