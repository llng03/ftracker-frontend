import { useState } from 'react'
import { updateCost } from '../../api/costApi'

export function UpdateCostModal({cost, setShowUpdateCost, onPatchSubmit, year, month}) {
    const [error, setError] = useState(null);
    const [updateCostRequest, setUpdateCostRequest] = useState({
        costId: cost.id,
        descr: "",
        amount: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateCost(updateCostRequest, year, month);
            setError(null);
            onPatchSubmit();
        } catch(err) {
            setError("Fehler beim Absenden: " + err.resposne?.data?.message || err.message);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUpdateCostRequest({
            ...updateCostRequest,
            [id]: value
        })
    }
        
    return (
        
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowUpdateCost(false)}>&times;</span>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="descr"></label>
                        <input type="text" id="descr" value={updateCostRequest.descr} placeholder= {cost.descr} onChange={handleChange}></input>
                        <label htmlFor="amount"></label>
                        <input
                            type="number" 
                            id="amount" 
                            value={updateCostRequest.amount}
                            placeholder = {cost.amount} 
                            onChange={handleChange}
                            step="0.01" 
                            min="0" 
                        ></input>
                        <button type="submit">Eintrag ändern</button>
                        {error &&
                            <p className="error">{error}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}