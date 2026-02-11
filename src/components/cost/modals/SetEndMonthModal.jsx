import { useState } from 'react';
import { updateFixedCost } from '../../../api/costApi';
import { ModalShell } from '../../ModalShell';


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
        start: (toMonthInputValue(fCost.startYear, fCost.startMonth)),
        end: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateFixedCost(updateFixedCostRequest);
            setError(null);
            onPatchSuccess();
        } catch(err) {
            setError("Fehler beim Absenden: " + err.response?.data?.message || err.message);
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
        <ModalShell onClose= {() => setShowSetEndMonth(false)} >
            <form onSubmit={handleSubmit} className="form-field">
                <label htmlFor="end">Endmonat</label>
                <input
                    type="month"
                    id="end"
                    value={updateFixedCostRequest.end}
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