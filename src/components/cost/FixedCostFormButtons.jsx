import './FixedCostFormButtons.css'

export function FixedCostFormButtons({ setShowFixedIncomeForm, setShowFixedExpForm, correctMode }) {
    return (
        <div className="fixed-cost-button-class">
            <div className= {correctMode ? "correct-mode" : ""}>
                <button onClick = {() => setShowFixedIncomeForm(true)} disabled={correctMode}>
                    Feste Einnahme hinzufügen
                </button>
            </div>
             <div className={correctMode ? "correct-mode" : ""}>
                <button onClick = {() => setShowFixedExpForm(true)} disabled={correctMode}>
                    Feste Ausgabe hinzufügen
                </button>
            </div>
        </div>
    );

}