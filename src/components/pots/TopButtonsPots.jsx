export function TopButtonsPots({ setShowDistributeModal, setShowCreatePotModal, correctMode, toggleCorrectMode }) {
    return (
        <>
            <div className="top-button-container">
                <a href="/" className="top-button-left">&larr; Zurück zur Startseite</a>
                <div className="top-button-right">
                    <button onClick={() => setShowDistributeModal(true)}>verteilen</button>
                    <button onClick={() => setShowCreatePotModal(true)}>neuen Pot erstellen</button>
                    <button onClick={() => toggleCorrectMode()}>{correctMode ? "KorrekturModus beenden" : "Korrekturmodus"}</button>
                </div>
            </div>
        </>
    );
}