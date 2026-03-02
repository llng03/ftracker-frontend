import { createMonthsCost } from "../../api/costApi";
import { useState } from 'react'
import { AddCategoryModal } from "./modals/AddCategoryModal";

export function CostForm({ income, onSuccess, year, month, categories, correctMode, user }) {
    const initialFormState = {
        descr: "",
        amount: "",
        income: income,
        category: "default"
    }
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(null);

    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createMonthsCost(formData, year, month);
            setFormData(initialFormState);
            setError(null);
            onSuccess();
        } catch (err) {
            setError("Fehler beim Absenden: " + err.response?.data?.message || err.message);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>{income ? "Einnahmen" : "Ausgaben"}</h2>
                <div className="form-field">
                    <label htmlFor="descr">{income ? "Einnahme" : "Ausgabe"}:</label>
                    <input 
                        disabled = {correctMode}
                        type="text"
                        id="descr"
                        placeholder="z.B. Einkauf bei Aldi" 
                        value={formData.descr}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="amount">Kosten (in €):</label>
                    <input 
                        disabled = {correctMode}
                        type="number" 
                        id="amount" 
                        value={formData.amount} 
                        step="0.01" 
                        min="0" 
                        placeholder="z.B. 12.50"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="cateogory">Kategorie: </label>
                    <select id="category" value={formData.category} onChange={handleChange}>
                        <option value="">-- keine Kategorie --</option>
                        {categories.map(category => 
                            <option key={category} value={category}>{category}</option>
                        )}
                    </select>
                </div>

                <button type="button" onClick={() => setShowAddCategory(true)}>+</button>

                <div className={correctMode ? "correct-mode" : ""}>
                    <button 
                        disabled={correctMode}
                        type="submit"
                    >Hinzufügen</button>
                </div>
                
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
            </form>

            {showAddCategory && (
                <AddCategoryModal showAddCategory={setShowAddCategory} onSuccess={onSuccess} />
            )}
        </>
    );
}