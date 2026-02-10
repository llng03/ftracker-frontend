import { useState } from 'react';
import { updateFixedCost } from '../../api/costApi';


export function SetEndMonthModal({ fCost, setShowSetEndMonth, onPatchSuccess }) {
    const toMonthInputValue = (year, month) => {
        return `${year}-${String(month).padStart(2, '0')}`;
    };
    const [error, setError] = useState(null);
    const [updateFixedCostRequest, setUpdateFixedCostRequest] = useState({
        costId: fCost.id,
        descr: fCost.descr,
        amount: fCost.amount,
        frequency: fCost.frequency,
        startMonth: (toMonthInputValue(fCost.startYear, fCost.startMonth)),
        endMonth: ""
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

    return (
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                    <span className="close" onClick={() =>
                        setShowSetEndMonth(false)
                    }>&times;</span>
                    <form onSubmit={handleSubmit} className="form-field">
                        <label htmlFor="endMonth">Endmonat</label>
                        <input 
                            type="month" 
                            id="endMonth" 
                            value={updateFixedCostRequest.endMonth} 
                            onChange={handleChange} 
                        />
                        <button type="submit">Festlegen</button>
                    </form>
                    <div className="error">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}