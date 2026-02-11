import { useState } from 'react';
import { ModalShell } from '../../ModalShell';

export function FixedCostFormModal({ isIncome, showModal, onSuccess, sendData, fCost, endMonth, change }) {
    const[endMonthToggled, setEndMonthToggled] = useState(fCost ? (fCost.end ? true : false) : false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState( {
        ...(fCost && { costId: fCost.id }),
        descr: fCost ? fCost.descr : "",
        amount: fCost ? fCost.amount : "",
        ...(!fCost && { isIncome: isIncome }),
        start: fCost ? fCost.start : "",
        end: fCost ? (fCost.end ? fCost.end : "") : "",
        frequency: fCost ? fCost.frequency : "MONTHLY"
    });

    const getCurrentMonthValue = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };

    const [changeMonth, setChangeMonth] = useState(getCurrentMonthValue);

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
            if(changeMonth) {
                await sendData(formData, changeMonth);
            } else {
                await sendData(formData);
            }
            setError(null);
        } catch (err) {
            setError("Fehler beim Absenden: " + err.response?.data?.message || err.message);
        }

        onSuccess();

        showModal(false);
    }

    function toggleEndMonth() {
        const next = !endMonthToggled;
        setEndMonthToggled(next);

        if(!next) {
            setFormData(prev => ({
                ...prev,
                end: ""
            }));
        }

    }

    if(endMonth) {
        return (
            <ModalShell onClose= {() => sendData(false)} >
                <form onSubmit={handleSubmit} className="form-field">
                    <label htmlFor="end">Endmonat</label>
                    <input
                        type="month"
                        id="end"
                        value={formData.end}
                        onChange={handleChange}
                    />
                    <button type="submit">Festlegen</button>
                </form>
                <div className="error">
                    <p>{error}</p>
                </div>
            </ModalShell>
        );
    }

    return (
        <ModalShell onClose={() => showModal(false)} >
            <form className="form-field" onSubmit = {handleSubmit}>
                {change && (
                    <>
                        <label htmlFor="change-month">Änderung ab: </label>
                        <input
                            type="month"
                            id="change-month"
                            required
                            value = {changeMonth}
                            onChange = {setChangeMonth}
                        />
                    </>
                )}
                <label htmlFor="descr">{isIncome ? "Eingabe:" : "Ausgabe:"}</label>
                <input 
                    type="text" 
                    id="descr" 
                    required = {!fCost}
                    value={formData.descr} 
                    placeholder="z.B. Miete" 
                    onChange = {handleChange}
                    disabled = {change}
                />

                <label htmlFor="amount">Betrag:</label>
                <input 
                    type="number" 
                    id="amount" 
                    value={formData.amount} 
                    step="0.01" 
                    min="0" 
                    required = {!fCost}
                    onChange={handleChange}
                />

                <label htmlFor="start">Startmonat:</label>
                <input 
                    type="month" 
                    id="start" 
                    value={formData.start} 
                    required = {!fCost}
                    onChange={handleChange}
                    disabled = {change}
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
        </ModalShell>
    );
}