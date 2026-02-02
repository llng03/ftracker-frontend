
import './TopButtons.css'

export function TopButtons({ setShowDelColumn, setShowOverview, setShowToPots  }) {

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
                        setShowDelColumn(true)
                    }>Löschen</button>
                </div>
            </div>
        </>
    );
}