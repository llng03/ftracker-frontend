

export function StatisticsMap({ categoryMap }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Kategorie</th>
                    <th>Betrag</th>
                </tr>
            </thead>
            <tbody>
                {categoryMap && (Object.entries(categoryMap).map(([category, sum]) =>(
                    <tr key={category}>
                        <td>{category}</td>
                        <td>{sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                    </tr>
                )))}
            </tbody>
        </table>
    );
}