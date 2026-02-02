import { deleteFixedCost } from "../../api/costApi";

export function OverviewTable({ fixedCosts, isIncome, correctMode, loadMonthOverview }) {
    function handleDelete(costId) {
        if (window.confirm("Willst du diesen Eintrag wirklich löschen?")) {
            deleteFixedCost(costId)
                .then(() => loadMonthOverview())
                .catch(err => alert("Fehler beim Löschen: " + 
                    err.response?.data?.message || err.message
                ));
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>{isIncome ? "Einnahme": "Ausgabe"}</th>
                    <th>Betrag</th>
                    <th>Frequenz</th>
                    <th>Startmonat</th>
                    <th>Endmonat</th>
                    {correctMode &&
                        <th>-</th>
                    }
                </tr>
            </thead>
            <tbody>
                {fixedCosts.map( fCost =>
                    <tr key={fCost.id}>
                        <td>{fCost.descr}</td>
                        <td>{fCost.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                        <td>{fCost.frequency}</td>
                        <td>{fCost.startYear + "-" + fCost.startMonth}</td>
                        <td>
                            {fCost.endMonth != null ? fCost.endYear + "-" + fCost.endMonth : '-'}
                        </td>
                        {correctMode &&
                            <td>
                                <button className="correct-delete-btn" onClick={() => handleDelete(fCost.id)}>x</button>
                            </td>
                        }
                    </tr>
                )}
                        
            </tbody>
        </table>
    );
}