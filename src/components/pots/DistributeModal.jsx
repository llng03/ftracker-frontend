import { distribute } from "../../api/potApi.js";
import { useState } from 'react';


export function DistributeModal({ pots, setShowDistributeModal, onSuccess }) {
    const[distributeRequest, setDistributeRequest] = useState({
        potId: "",
        amount: ""
}   );
    const[error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDistributeRequest({
            ...distributeRequest,
            [id]: Number(value)
        });
    };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                await distribute(distributeRequest);
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
                    <span 
                        className="close" 
                        onClick={() => setShowDistributeModal(false)}
                    >&times;</span>

                    <form className="form-field" onSubmit={handleSubmit}>
                        <label htmlFor="potId">Verteile an Pot:</label>
                        <select 
                            id="potId" 
                            value= {distributeRequest.id} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">-- Bitte Pot auswählen --</option>
                            {pots.map( pot =>
                                <option 
                                    key={pot.id}
                                    value={pot.id}  
                                >{pot.name}</option>
                            )}
                        </select>
                        <label htmlFor="amount">Betrag: </label>
                        <input 
                            type="number" 
                            name="amount" 
                            id="amount" 
                            value = {distributeRequest.amount}
                            onChange= {handleChange}
                            step="0.01" 
                            min="0" 
                            required 
                        />

                        <button type="submit">Verteilen</button>
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