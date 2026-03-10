import './App.css'
import { MonthOverview } from './components/cost/MonthOverview'
import { PotOverview } from './components/pots/PotOverview'
import { StatisticsOverview } from './components/statistics/StatisticsOverview'
import { Routes, Route } from "react-router-dom";
import { ShowRoutes } from './ShowRoutes'
import { useState, useEffect } from 'react'
import { getCurrentUser } from './api/loginApi';

import { LoginPage } from './components/LoginPage'


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

    const handleLogoutDemo = () => {
        sessionStorage.removeItem("demo_token");
        loadUser();
    }


    if(!user) {
        return(
            <LoginPage setLoading={setLoading} uloadUser={loadUser}/>
        );
    }

    const demoToken = sessionStorage.getItem("demo_token");
    const isDemo = Boolean(demoToken);
    
    return (
        <>
            {loading && (<p>Lade Daten...</p>)}
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