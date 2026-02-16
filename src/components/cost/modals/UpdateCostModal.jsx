import { useState } from 'react'
import { updateCost } from '../../../api/costApi'

export function UpdateCostModal({cost, setShowUpdateCost, onPatchSubmit, year, month, categories}) {
    const [error, setError] = useState(null);
    const [updateCostRequest, setUpdateCostRequest] = useState({
        costId: cost.id,
        descr: cost.descr,
        amount: cost.amount,
        category: cost.category ? cost.category.categoryName : "default"
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
                    <form onSubmit={handleSubmit} className="form-field">
                        <label htmlFor="descr">Beschreibung</label>
                        <input type="text" id="descr" value={updateCostRequest.descr}onChange={handleChange}></input>
                        <label htmlFor="amount">Betrag</label>
                        <input
                            type="number" 
                            id="amount" 
                            value={updateCostRequest.amount}
                            onChange={handleChange}
                            step="0.01" 
                            min="0" 
                        ></input>

                        <div className="form-field">
                            <label htmlFor="cateogory">Kategorie: </label>
                            <select id="category" value={updateCostRequest.category} onChange={handleChange}>
                                <option value="">-- keine Kategorie --</option>
                                {categories.map(category => 
                                    <option key={category} value={category}>{category}</option>
                                )}
                            </select>
                        </div>
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
    );
}