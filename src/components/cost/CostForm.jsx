import { createMonthsCost } from "../../api/costApi";
import { useState } from 'react'

export function CostForm({ isIncome, onSuccess, year, month }) {
    const initialFormState = {
        descr: "",
        amount: "",
        isIncome: isIncome
    }
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(null);

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
        <form onSubmit={handleSubmit}>
            <h2>{isIncome ? "Einnahmen" : "Ausgaben"}</h2>
            <div className="form-field">
                <label htmlFor="descr">{isIncome ? "Einnahme" : "Ausgabe"}:</label>
                <input 
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
                    type="number" 
                    id="amount" 
                    value={formData.amount} 
                    step="0.01" 
                    min="0" 
                    placeholder="z.B. 12.50"
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Hinzufügen</button>
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
        </form>
    );
}