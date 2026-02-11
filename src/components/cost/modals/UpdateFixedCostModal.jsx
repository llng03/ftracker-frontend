import { useState } from 'react'
import { updateFixedCost } from '../../../api/costApi'
import { ModalShell } from '../../ModalShell'; 
import { useFixedCostModal } from './useFixedCostModal';

export function UpdateFixedCostModal({ fCost, setShowUpdateFixedCost, onPatchSuccess, correctMode }){
    
    const { form, setForm, error, setError } = useFixedCostModal({ fCost });

    const [endMonthToggled, setEndMonthToggled] = useState(fCost.endMonth != null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateFixedCost(form);
            setError(null);
            onPatchSuccess();
        } catch(err) {
            setError("Fehler beim Absenden: " + err.response?.data?.message || err.message);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({
            ...form,
            [id]: value
        })
    }

    function setEndToNull() {
        setEndMonthToggled(!endMonthToggled);
        setForm({
            ...form,
            ["endMonth"]: ""
        });
    }

    return (
        <ModalShell onClose={() => setShowUpdateFixedCost(false)} >
            <form onSubmit={handleSubmit} className="form-field">
                <label htmlFor="descr">Beschreibung</label>
                <input type="text" id="descr" onChange={handleChange} value={form.descr} disabled={!correctMode}/>
                <label htmlFor="amount">Betrag</label>
                <input 
                    type="number" 
                    id="amount"
                    onChange={handleChange}
                    value={form.amount}
                    min="0"
                    step="0.01"
                />
                <label htmlFor="frequency">Häufigkeit</label>
                <select value={form.frequency} id="frequency" onChange={handleChange}>
                    <option value="MONTHLY">monatlich</option>
                    <option value="QUARTERLY">vierteljährlich</option>
                    <option value="SEMI_ANNUAL">halbjährlich</option>
                    <option value="ANNUAL">jährlich</option>
                </select>
                <label htmlFor="startMonth">Start</label>
                <input type="month" id="startMonth" value={form.startMonth} onChange={handleChange}></input>
                <label className="checkbox-label">  
                <input 
                    type="checkbox" 
                    id="endToggle" 
                    onChange={() => 
                        setEndToNull()
                    } 
                    checked = {!endMonthToggled}
                />
                    Kein Endmonat (läuft unbefristet)
                </label>

                {endMonthToggled && (
                    <>
                        <label htmlFor="endMonth">Endmonat</label>
                        <input 
                            type="month" 
                            id="endMonth" 
                            value={form.endMonth} 
                            onChange={handleChange} 
                        />
                    </>
                )}
                <button type="submit">Eintrag ändern</button>
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
            </form>
        </ModalShell>
    )
}