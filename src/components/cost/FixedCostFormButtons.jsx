import './FixedCostFormButtons.css'

export function FixedCostFormButtons({ setShowFixedIncomeForm, setShowFixedExpForm}) {
    return (
        <div className="fixed-cost-button-class">
            <button onClick = {() => setShowFixedIncomeForm(true)}>
                Feste Einnahme hinzufügen
            </button>

            <button onClick = {() => setShowFixedExpForm(true)} >
                Feste Ausgabe hinzufügen
            </button>
        </div>
    );

}