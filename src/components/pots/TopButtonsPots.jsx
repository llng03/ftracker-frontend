export function TopButtonsPots({ setShowDistributeModal, setShowCreatePotModal }) {
    return (
        <>
            <div className="top-button-container">
                <a href="/" className="top-button-link">&larr; Zurück zur Startseite</a>
                <div className="top-button-right">
                    <button onClick={() => setShowDistributeModal(true)}>verteilen</button>
                    <button onClick={() => setShowCreatePotModal(true)}>neuen Pot erstellen</button>
                </div>
            </div>
        </>
    );
}