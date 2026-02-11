import { useState } from 'react'
import { addPot } from '../../../api/potApi'

export function CreatePotModal({ setShowCreatePotModal, onSuccess }) {
    const [error, setError] = useState(null);
    const [newPot, setNewPot] = useState({
        name: "",
        entries: []
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewPot({
            ...newPot,
            [id]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await addPot(newPot);
            setError(null);
            onSuccess();
        } catch (err) {
            setError("Fehler beim Absenden: " + err.resposne?.data?.message || err.message);
        }
    }

    return (
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                <span className="close" onClick={() => setShowCreatePotModal(false)}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name des neuen Pots: </label>
                    <input type="text"id="name" value={newPot.name} onChange={handleChange} required />
                    <button type="submit">Erstellen</button>
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