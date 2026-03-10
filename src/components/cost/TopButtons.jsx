
import './TopButtons.css'
import { Link } from "react-router-dom";

export function TopButtons({ setShowOverview, setShowToPots, correctMode, toggleCorrectMode  }) {

    return (
        <>
            <div className="top-button-container">
                <Link to="/pots" className="top-button-left">&rarr; Zu den Pots</Link>
                <Link to="/statistics" className="top-button-left">&rarr; Zu den Statistiken</Link>
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