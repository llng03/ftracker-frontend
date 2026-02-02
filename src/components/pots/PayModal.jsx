import { takeMoney } from '../../api/potApi.js'
import { useState } from 'react'

export function PayModal({ potId, setActivatePotIdForPay, onSuccess }) {
    const[ takeMoneyRequest, setTakeMoneyRequest ] = useState({
        potId: potId,
        amount: ""
    });
    const[error, setError] = useState(null);
    
     const handleChange = (e) => {
            const { id, value } = e.target;
            setTakeMoneyRequest({
                ...takeMoneyRequest,
                [id]: value
            });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                await takeMoney(takeMoneyRequest);
                setError(null);
                onSuccess();
            } catch (err) {
                setError("Fehler beim Absenden: " + err.response?.data?.message || err.message);
            }
    
        }


    return (
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                <span className="close" onClick={() => setActivatePotIdForPay(null)}>x</span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">Betrag</label>
                    <input 
                        type="number" 
                        name="amount" 
                        id="amount" 
                        step="0.01" 
                        min="0"
                        value={takeMoneyRequest.amount} 
                        onChange={handleChange}
                        required 
                    />
                    <button type="submit">Bezahlen</button>
                    <div className="error">
                        <p>{error}</p>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}