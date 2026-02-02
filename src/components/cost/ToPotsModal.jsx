import { getPotList } from '../../api/potApi.js'
import { addToPots } from '../../api/costApi.js'
import { useState, useEffect } from 'react'

export function ToPotsModal({ setShowToPots, year, month, onSuccess }) {
    const [pots, setPots] = useState([]);
    const [error, setError] = useState(null);
    const [distributeRequest, setDistributeRequest] = useState({
        potId: "",
        amount: ""
    })

    useEffect(() => {
        getPotList()
            .then(response => {
                setPots(response.data);
             })
        }, []
    );

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDistributeRequest({
            ...distributeRequest,
            [id]: value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await addToPots(year, month, distributeRequest);
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
                    <span className="close" onClick={() =>
                        setShowToPots(false)
                    }>&times;</span>
                    <form className="form-field" onSubmit={handleSubmit}>
                        <label htmlFor="amount">Betrag: </label>
                        <input 
                            type="number" 
                            id="amount" 
                            name="amount" 
                            value={distributeRequest.amount}
                            onChange={handleChange}/>

                        <div id ="potSelection">
                            <label htmlFor="potId">Pot: </label>
                            <select 
                                name="potId" 
                                id="potId" 
                                onChange={handleChange} 
                                value={distributeRequest.potId}
                            >
                                <option value="">-- kein Pot --</option>
                                {pots.map( pot => 
                                    <option key= {pot.id} value={pot.id}>{pot.name}</option>
                                )}
                            </select>
                        </div>

                        <button type="submit">Abschicken</button>
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}