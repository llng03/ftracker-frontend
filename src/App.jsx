import { useState, useEffect } from 'react';
import { getMonthOverview } from './api/costApi.js'
import { MonthHeader } from './MonthHeader.jsx';
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

    return (
        <div>
            <MonthHeader 
                currMonth = {month}
                currYear = {year}
                setMonth = {setMonth}
                setYear = {setYear}
            />
        </div>
    );
}