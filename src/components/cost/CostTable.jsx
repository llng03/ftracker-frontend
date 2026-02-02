import './CostTable.css'

export function CostTable({ costs, sum, isIncome, showDelColumn }) {

    return (
        <div>
            <div id={isIncome? "einnamen-table" : "ausgaben-table"}>
                <table>
                    <thead>
                    <tr>
                        <th>{isIncome? "Einnahme" : "Ausgabe"}</th>
                        <th>Betrag</th>
                        {showDelColumn && (
                            <th></th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                        {costs.map(cost =>
                            <tr key={cost.id}>
                                <td>{cost.descr}</td>
                                <td>{Number(cost.amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                {showDelColumn && (
                                    <td>
                                
                                        <button type="submit" className="delete-btn">x</button>

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