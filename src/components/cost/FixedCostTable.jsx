
import './FixedCostTable.css'

//<p>= {sumFixedCosts().toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>


export function FixedCostTable({ fixedCosts, isIncome }) {
    const sumFixedCosts = () => {
        return fixedCosts.reduce((acc, cost) => acc + cost.amount, 0);
    }

    return (
        <table className={isIncome ? "fixed-income" : "fixed-expense"}>
            <tbody>
                {fixedCosts.map((fCost, index) => (
                    <tr key={fCost.id}>
                        <td>{index === 0 ? "" : "+"}</td>
                        <td>{fCost.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                        <td>{fCost.descr}</td>
                    </tr>
                ))}
                <tr>
                    <td> = </td>
                    <td><b>{sumFixedCosts().toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</b></td>
                    <td><b>Gesamt</b></td>
                </tr>
            </tbody>
            
        </table>
    );
}
