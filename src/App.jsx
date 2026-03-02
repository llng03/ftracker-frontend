import './App.css'
import { MonthOverview } from './components/cost/MonthOverview'
import { PotOverview } from './components/pots/PotOverview'
import { StatisticsOverview } from './components/statistics/StatisticsOverview'
import { Routes, Route } from "react-router-dom";
import { ShowRoutes } from './ShowRoutes'
import { useState, useEffect } from 'react'
import { getCurrentUser } from './api/loginApi';


export function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);
    if(!user) {
        return (
            <a href="http://localhost:8081/login/oauth2/code/google">
                Login
            </a>
        )

    }
    
    return (
        <>
            {loading && <div>lade Daten...</div>}
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