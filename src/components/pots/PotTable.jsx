
export function PotTable({ pot }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Betrag</th>
                </tr>
            </thead>
            <tbody>
                {pot.entries.map(entry =>
                    <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{Number(entry.amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

}