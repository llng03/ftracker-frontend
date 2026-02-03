import './CostTable.css'
import { deleteCost } from '../../api/costApi'

export function CostTable({ costs, sum, isIncome, correctMode, year, month, loadMonthOverview }) {
    function handleDelete(costId) {
        if (window.confirm("Willst du diesen Eintrag wirklich löschen?")) {
            deleteCost(costId, year, month)
                .then(() => loadMonthOverview())
                .catch(err => alert("Fehler beim Löschen: " + 
                    err.response?.data?.message || err.message
                ));
        }
    }

    return (
        <div>
            <div id={isIncome? "einnamen-table" : "ausgaben-table"}>
                <table>
                    <thead>
                    <tr>
                        <th>{isIncome? "Einnahme" : "Ausgabe"}</th>
                        <th>Betrag</th>
                        {correctMode && (
                            <th></th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                        {costs.map(cost =>
                            <tr key={cost.id}>
                                <td>{cost.descr}</td>
                                <td>{Number(cost.amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                {correctMode && (
                                    <td>
                                        <button onClick={() => handleDelete(cost.id)} className="correct-delete-btn">x</button>
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={isIncome? "sum-in" : "sum-out"}>
                    <b>Summe: </b>
                    <span>{sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                </div>
            </div>
        </div>
    );
}