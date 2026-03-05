export function TopButtonsPots({ setShowDistributeModal, setShowCreatePotModal, correctMode, toggleCorrectMode }) {
    return (
        <>
            <div className="top-button-container">
                <a href="/" className="top-button-left">&larr; Zurück zur Startseite</a>
                <div className="top-button-right">
                    <div className={correctMode ? "correct-mode" : ""}>
                        <button onClick={() => setShowDistributeModal(true)} disabled={correctMode}>verteilen</button>
                    </div>
                    <div className={correctMode ? "correct-mode" : ""}>
                        <button onClick={() => setShowCreatePotModal(true)} disabled={correctMode}>neuen Pot erstellen</button>
                    </div>
                    <button onClick={() => toggleCorrectMode()}>{correctMode ? "KorrekturModus beenden" : "Korrekturmodus"}</button>
                </div>
            </div>
        </>
    );
}