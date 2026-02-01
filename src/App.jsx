import { useState, useEffect } from 'react';
import { getMonthOverview } from './api/costApi.js'
import { MonthHeader } from './components/MonthHeader.jsx';
import { CostTables } from './components/CostTables.jsx' ;
import { TopButtons } from './components/TopButtons.jsx';
import { OverviewModal } from './components/OverviewModal.jsx';
import { ToPotsModal } from './components/ToPotsModal.jsx';
import './App.css'

export function App() {
    const[monthData, setMonthData] = useState(null);
    const[showDelColumn, setShowDelColumn] = useState(false);
    const [showOverview, setShowOverview] = useState(false);
    const [showToPots, setShowToPots] = useState(false);

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date ().getFullYear());

    useEffect(() => {
        getMonthOverview(year, month)
        .then(response => {
            setMonthData(response.data);
        })
    }, [year, month]);

    if (!monthData) {
        return <p>Lade Monatsdaten…</p>;
    }

    return (
        <div>
            <MonthHeader 
                currMonth = {month}
                currYear = {year}
                setMonth = {setMonth}
                setYear = {setYear}
            />

            <TopButtons 
                setShowDelColumn = {setShowDelColumn}
                setShowOverview = {setShowOverview}
                setShowToPots = {setShowToPots}
            />

            <CostTables 
                allMonthsIncome = {monthData.allMonthsIncome}
                allMonthsExpense = {monthData.allMonthsExpense}
                sumIn = {monthData.sumIn}
                sumOut = {monthData.sumOut}
                difference = {monthData.difference}
                showDelColumn = {showDelColumn}
            />

            {showOverview && (
                <OverviewModal 
                    setShowOverview = {setShowOverview}
                    fixedIncome = {monthData.fixedIncome}
                    fixedExpense = {monthData.fixedExpense}
                />
            )}

            {showToPots && (
                <ToPotsModal 
                    setShowToPots = {setShowToPots}
                />
            )}
        </div>
    );
}