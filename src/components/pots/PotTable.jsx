
import { deletePotEntry } from '../../api/costApi'

export function PotTable({ pot, loadPotOverview, correctMode }) {

    function deleteEntry(entryId) {
        const deleteEntryRequest = {
            potId: pot.id,
            entryId: entryId
        }
        console.log(deleteEntryRequest)
        if (window.confirm("Willst du diesen Eintrag wirklich löschen?")) {
            deletePotEntry(deleteEntryRequest)
                .then(() => loadPotOverview())
                .catch(err => alert("Fehler beim Löschen: " + 
                    err.response?.data?.message || err.message
                ));
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Betrag</th>
                    {correctMode && (
                        <th>-</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {pot.entries.map(entry =>
                    <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{Number(entry.amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                        {correctMode && (
                            <td>
                                <button className="correct-delete-btn" onClick={() => deleteEntry(entry.id)}>x</button>
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );

}