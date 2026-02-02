import { PayModal } from './PayModal'
import { PotTable } from './PotTable'
import { useState } from 'react'
import { deletePot } from '../../api/potApi.js'
import './PotContainer.css'

export function PotContainer({ pots, loadPotOverview }) {
    const [activatePotIdForPay, setActivatePotIdForPay] = useState(null);

    function sum(pot) {
        return pot.entries.reduce((acc, entry) => acc + entry.amount, 0);
    }

    function onSuccess() {
        setActivatePotIdForPay(null);
        loadPotOverview();
    }

    function handleDelete(potId) {
        if (window.confirm("Willst du diesen Pot wirklich löschen?")) {
            deletePot(potId)
                .then(() => loadPotOverview())
                .catch(err => alert("Fehler beim Löschen: " + 
                    err.response?.data?.message || err.message
                ));
        }
    }

    return (
        <div className="pots-container">
            {pots.map( pot =>
                <div key={pot.id}>
                    <div className="pot-header">
                        <h3>{pot.name}</h3>
                        <button onClick={() => handleDelete(pot.id)} className="delete-btn">x</button>
                    </div>

                    <button onClick={() => setActivatePotIdForPay(pot.id)}>Geld herausnehmen</button>

                    {activatePotIdForPay === pot.id  && (
                        <PayModal 
                            potId={pot.id}
                            setActivatePotIdForPay={setActivatePotIdForPay}
                            onSuccess={onSuccess} 
                        />
                    )}

                    <PotTable pot={pot} />

                    <b>{"Summe: " + Number(sum(pot)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</b>
                </div>
            )}
        </div>
    );
}