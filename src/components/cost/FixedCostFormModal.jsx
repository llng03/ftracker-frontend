import { useState } from 'react';
import { createFixedCost } from "../../api/costApi";

export function FixedCostFormModal({ isIncome, setShowFixedCostForm, onSuccess }) {
    const[endMonthToggled, setEndMonthToggled] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState( {
        descr: "",
        amount: "",
        isIncome: isIncome,
        start: "",
        end: "",
        frequency: "MONTHLY"
    });

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
            await createFixedCost(formData);
            setError(null);
        } catch (err) {
            setError("Fehler beim Absenden: " + err.response?.data?.message || err.message);
        }

        onSuccess();

        setShowFixedCostForm(false);
    }

    function toggleEndMonth() {
        setEndMonthToggled(!endMonthToggled)
    }

    return (
        <div className="overlay">

            <div className="popup">
                <div className="modal-content">
                    <span className="close" onClick={ () =>
                        setShowFixedCostForm(false)
                    }>&times;</span>

                    <form className="form-field" onSubmit = {handleSubmit}>
                        <label htmlFor="descr">{isIncome ? "Eingabe:" : "Ausgabe:"}</label>
                        <input 
                            type="text" 
                            id="descr" 
                            value={formData.descr} 
                            placeholder="z.B. Miete" 
                            onChange = {handleChange}
                        />

                        <label htmlFor="amount">Betrag:</label>
                        <input 
                            type="number" 
                            id="amount" 
                            value={formData.amount} 
                            step="0.01" 
                            min="0" 
                            onChange={handleChange}
                        />

                        <label htmlFor="start">Startmonat:</label>
                        <input 
                            type="month" 
                            id="start" 
                            value={formData.start} 
                            required 
                            onChange={handleChange}
                        />

                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                
                                id="endToggle" 
                                onChange={() => toggleEndMonth()} 
                                checked = {!endMonthToggled}
                            />
                            Kein Endmonat (läuft unbefristet)
                        </label>

                        {endMonthToggled && (
                            <>
                                <label htmlFor="end">Endmonat</label>
                                <input 
                                    type="month" 
                                    id="end" 
                                    value={formData.end} 
                                    onChange={handleChange} 
                                />
                            </>
                        )}

                        <label htmlFor="frequency">Häufigkeit: </label>
                        <select id="frequency" value={formData.frequency} onChange={handleChange}>
                            <option value="MONTHLY">monatlich</option>
                            <option value="QUARTERLY">vierteljährlich</option>
                            <option value="SEMI_ANNUAL">halbjährlich</option>
                            <option value="ANNUAL">jährlich</option>
                        </select>

                        <button type="submit">Hinzufügen</button>
                        {error && (
                            <div className="error">
                                <p>{error}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}