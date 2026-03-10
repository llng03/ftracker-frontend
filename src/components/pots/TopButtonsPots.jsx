import {Link} from "react-router-dom"

export function TopButtonsPots({ setShowDistributeModal, setShowCreatePotModal, correctMode, toggleCorrectMode }) {
    return (
        <>
            <div className="top-button-container">
                <Link to="/" className="top-button-left">&larr; Zurück zur Startseite</Link>
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