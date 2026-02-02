import './App.css'
import { MonthOverview } from './components/cost/MonthOverview'
import { PotOverview } from './components/pots/PotOverview'
import { Routes, Route } from "react-router-dom";


export function App() {
    return (
        <Routes>
            <Route path="/" element={<MonthOverview />} />
            <Route path="/pots" element={<PotOverview />} />
        </Routes>
    )
}