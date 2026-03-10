import { startDemo } from '../api/demoApi';
import './LoginPage.css'

export function LoginPage( {setLoading, loadUser} ) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const GOOGLE_LOGIN_URL = `${API_BASE_URL}/login/oauth2/code/google`;
    

    const handleStartDemo = async() => {
        try {
            setLoading(true);
            const data = await startDemo();
            sessionStorage.setItem("demo_token", data.token);
            await loadUser();
        
    
        } catch (e) {
            console.error(e);
            alert("demo konnte nicht gestartet werden.");
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Login</h1>
                <p className="login-subtitle">
                    Melde dich mit Google an oder starte eine Demo.
                </p>

                <div className="login-actions">
                    <a className="google-login" href={GOOGLE_LOGIN_URL}>
                        Login mit Google
                    </a>

                    <div className="login-divider">oder</div>

                    <button className="demo-start" onClick={handleStartDemo}>
                        Demo starten
                    </button>
                </div>

                <p className="login-note">
                    Demo-Daten werden automatisch gelöscht.
                </p>
            </div>
        </div>
    )
}