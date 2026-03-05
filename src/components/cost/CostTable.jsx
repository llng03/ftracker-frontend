import './CostTable.css'
import { useState } from 'react'
import { deleteCost } from '../../api/costApi'
import { UpdateCostModal } from './modals/UpdateCostModal'

export function CostTable({ costs, sum, isIncome, correctMode, year, month, loadMonthOverview, categories }) {
    const [showUpdateCost, setShowUpdateCost] = useState(null);

    function handleDelete(costId) {
        if (window.confirm("Willst du diesen Eintrag wirklich löschen?")) {
            deleteCost(costId, year, month)
                .then(() => loadMonthOverview())
                .catch(err => alert("Fehler beim Löschen: " + 
                    err.response?.data?.message || err.message
                ));
        }
    }

    function onPatchSubmit() {
        setShowUpdateCost(null);
        loadMonthOverview()
    }

    return (
        <div>
            <div id={isIncome? "einnamen-table" : "ausgaben-table"}>
                <table>
                    <thead>
                    <tr>
                        <th>{isIncome? "Einnahme" : "Ausgabe"}</th>
                        <th>Kategorie</th>
                        <th>Betrag</th>
                        {correctMode && (
                            <>
                                <th></th>
                                <th></th>
                            </>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                        
                        {costs.map(cost =>
                            <tr key={cost.id}>
                                <td>{cost.descr}</td>
                                <td>{cost.category.categoryName}</td>
                                <td>{Number(cost.amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                {correctMode && (
                                    <>
                                        <td>
                                            <button onClick = {() => setShowUpdateCost(cost)} className="correct-delete-btn">🖌️</button>
                                        </td>
                                        
                                        <td>
                                            <button onClick={() => handleDelete(cost.id)} className="correct-delete-btn">x</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={isIncome? "sum-in" : "sum-out"}>
                    <b>Summe: </b>
                    <span>{sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                </div>

                {showUpdateCost &&
                    <UpdateCostModal 
                        cost= {showUpdateCost}
                        setShowUpdateCost={setShowUpdateCost}
                        onPatchSubmit = {onPatchSubmit}
                        year = {year}
                        month = {month}
                        categories = {categories}
                    />
                }

                
            </div>
        </div>
    );
}