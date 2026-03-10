import {Link} from "react-router-dom"

export function BackButton() {
    return (
        <Link to="/" className="top-button-left">&larr; Zurück zur Startseite</Link>
    );
}