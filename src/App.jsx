import { useState, useEffect } from 'react';
import { getMonthOverview } from './api/costApi.js'
import { MonthHeader } from './MonthHeader.jsx';
import { CostTables } from './CostTables.jsx' 
import './App.css'

export function App() {
    const[monthData, setMonthData] = useState(null);

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

            <CostTables 
                allMonthsIncome = {monthData.allMonthsIncome}
                allMonthsExpense = {monthData.allMonthsExpense}
                sumIn = {monthData.sumIn}
                sumOut = {monthData.sumOut}
                difference = {monthData.difference}
            />
        </div>
    );
}