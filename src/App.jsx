import './App.css'
import { MonthOverview } from './components/cost/MonthOverview'
import { PotOverview } from './components/pots/PotOverview'
import { StatisticsOverview } from './components/statistics/StatisticsOverview'
import { Routes, Route } from "react-router-dom";
import { ShowRoutes } from './ShowRoutes'
import { useState, useEffect } from 'react'
import { getCurrentUser } from './api/loginApi';
import { startDemo } from './api/demoApi';


export function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = () => {
        setLoading(true);
        getCurrentUser()
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
    const loadUser = async () => {
        try {
            const res = await getCurrentUser();
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    loadUser();
}, []);
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

    const handleLogoutDemo = () => {
        sessionStorage.removeItem("demo_token");
        loadUser();
    }

    if(!user) {
        return(
            <div style={{display: "flex", flexDirection: "column", gap:12}}>
                <a href="http://localhost:8081/login/oauth2/code/google">
                    Login mit Google
                </a>

                <button onClick={handleStartDemo}>
                    Demo starten (ohne Login)
                </button>
            </div>

        );
    }

    const demoToken = sessionStorage.getItem("demo_token");
    const isDemo = Boolean(demoToken);
    
    return (
        <>
            {isDemo && (
                <div style = {{padding: 8, boarder: "1px solid #ccc", marginBottom: 12}}>
                    Demo-Modus - Daten werden später gelöscht.
                    <button style={{maginLeft: 12}} onClick= {handleLogoutDemo}>
                        Demo verlassen
                    </button>
                </div>
            )}
            <Routes>
                <Route 
                    path="/" 
                    element={<MonthOverview 
                        user = {user}
                    />} 
                />
                <Route 
                    path="/pots" 
                    element={<PotOverview />} 
                />
                <Route
                    path="/statistics"
                    element={<StatisticsOverview 
                        name={user.name}
                    />}
                />
            </Routes>
        </>
    )
}