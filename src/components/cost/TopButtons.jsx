
import './TopButtons.css'

export function TopButtons({ setShowOverview, setShowToPots, correctMode, toggleCorrectMode  }) {

    return (
        <>
            <div className="top-button-container">
                <a href="/pots" className="top-button-left">&rarr; Zu den Pots</a>
                <a href="/statistics" className="top-button-left">&rarr; Zu den Statistiken</a>
                <div className="top-button-right">
                    <button onClick={() =>
                        setShowOverview(true)
                    }>Überblick Feste Einnahmen und Ausgaben</button>
                    <div className={correctMode ? "correct-mode" : ""}>
                        <button disabled = {correctMode} 
                            onClick={() => setShowToPots(true)
                        }>Geld auf Pots verteilen</button>
                    </div>
                    <button onClick={ () =>
                        toggleCorrectMode()
                    }>{correctMode ? "Korrekturmodus beenden" : "Korrekturmodus"}</button>
            
                </div>
            </div>
        </>
    );
}