
import './TopButtons.css'

export function TopButtons({ setShowOverview, setShowToPots, correctMode, toggleCorrectMode  }) {

    return (
        <>
            <div className="top-button-container">
                <a href="/pots" className="top-button-left">&rarr; Zu den Pots</a>
                <div className="top-button-right">
                    <button onClick={() =>
                        setShowOverview(true)
                    }>Überblick Feste Einnahmen und Ausgaben</button>
                    <button onClick={() =>
                        setShowToPots(true)
                    }>Geld auf Pots verteilen</button>
                    <button onClick={ () =>
                        toggleCorrectMode()
                    }>{correctMode ? "Korrekturmodus beenden" : "Korrekturmodus"}</button>
                </div>
            </div>
        </>
    );
}