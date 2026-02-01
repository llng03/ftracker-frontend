import './CostTable.css'

export function CostTable({ costs, sum, isIncome }) {
    return (
        <div>
            <div id={isIncome? "einnamen-table" : "ausgaben-table"}>
                <table>
                    <thead>
                    <tr>
                        <th>{isIncome? "Einnahme" : "Ausgabe"}</th>
                        <th>Betrag</th>
                        <th className="delete-col hidden"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {costs.map(cost =>
                            <tr key={cost.id}>
                                <td>{cost.descr}</td>
                                <td>{cost.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                <td className="del-col hidden">
                                    <form method="post" th:if="${!cost.isFixedCost()}" th:action="@{/{currYear}/{currMonth}/deleteIncome(currYear=${currYear}, currMonth=${currMonth})}">
                                        <input type="hidden" name="id" th:value="${cost.id}" />
                                        <button type="submit" className="delete-btn">x</button>
                                    </form>
                                </td>
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