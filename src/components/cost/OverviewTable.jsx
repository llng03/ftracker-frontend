export function OverviewTable({ fixedCosts, isIncome }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>{isIncome ? "Einnahme": "Ausgabe"}</th>
                    <th>Betrag</th>
                    <th>Frequenz</th>
                    <th>Startmonat</th>
                    <th>Endmonat</th>
                    <th>-</th>
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
                        <td>
                            <form method="post" th:action="@{/{year}/{month}/deleteFixedExpense(year=${currYear}, month=${currMonth})}">
                                <input type="hidden" name="descr" th:value="${fExpense.descr}" />
                                <input type="hidden" name="start" th:value="${fExpense.start}" />
                                <button type="submit">-</button>
                            </form>
                        </td>
                    </tr>
                )}
                        
            </tbody>
        </table>
    );
}