import { useState } from 'react'
import { updateFixedCost } from '../../api/costApi'

export function UpdateFixedCostModal({ fCost, setShowUpdateFixedCost, onPatchSuccess }){
    const toMonthInputValue = (year, month) => {
        return `${year}-${String(month).padStart(2, '0')}`;
    };
    const [error, setError] = useState(null);
    const [endMonthToggled, setEndMonthToggled] = useState(fCost.endMonth != null);
    const [updateFixedCostRequest, setUpdateFixedCostRequest] = useState({
        costId: fCost.id,
        descr: fCost.descr,
        amount: fCost.amount,
        frequency: fCost.frequency,
        startMonth: (toMonthInputValue(fCost.startYear, fCost.startMonth)),
        endMonth: (fCost.endMonth == null ? "" : toMonthInputValue(fCost.endYear, fCost.endMonth))
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateFixedCost(updateFixedCostRequest);
            setError(null);
            onPatchSuccess();
        } catch(err) {
            setError("Fehler beim Absenden: " + err.resposne?.data?.message || err.message);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUpdateFixedCostRequest({
            ...updateFixedCostRequest,
            [id]: value
        })
    }

    function setEndToNull() {
        setEndMonthToggled(!endMonthToggled);
        setUpdateFixedCostRequest({
            ...updateFixedCostRequest,
            ["endMonth"]: ""
        });
    }

    return(
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                    <button className="close" onClick={() => setShowUpdateFixedCost(null)}>x</button>
                    <form onSubmit={handleSubmit} className="form-field">
                        <label htmlFor="descr">Beschreibung</label>
                        <input type="text" id="descr" onChange={handleChange} value={updateFixedCostRequest.descr}/>
                        <label htmlFor="amount">Betrag</label>
                        <input 
                            type="number" 
                            id="amount"
                            onChange={handleChange}
                            value={updateFixedCostRequest.amount}
                            min="0"
                            step="0.01"
                        />
                        <label htmlFor="frequency">Häufigkeit</label>
                        <select value={updateFixedCostRequest.frequency} id="frequency" onChange={handleChange}>
                            <option value="MONTHLY">monatlich</option>
                            <option value="QUARTERLY">vierteljährlich</option>
                            <option value="SEMI_ANNUAL">halbjährlich</option>
                            <option value="ANNUAL">jährlich</option>
                        </select>
                        <label htmlFor="startMonth">Start</label>
                        <input type="month" id="startMonth" value={updateFixedCostRequest.startMonth} onChange={handleChange}></input>
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
                                    value={updateFixedCostRequest.endMonth} 
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
                </div>
            </div>
        </div>
    )
}