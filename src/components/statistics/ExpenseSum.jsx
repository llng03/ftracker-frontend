

export function ExpenseSum({ sum, differenceSum }) {
    return (
        <>
            <h2>Gesamtausgaben: {sum} €</h2>
            <p>{differenceSum < 0 ? "-" : "+"} {Math.abs(differenceSum)} € im Vergleich zum letzten Monat</p>

        </>
    )
}