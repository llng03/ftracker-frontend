import { MonthHeader } from "../MonthHeader";
import { useState } from "react";


export function StatisticsOverview() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());


    return (
        <>
            <h1>Statistiken</h1>
            <MonthHeader 
                currMonth={month}
                currYear={year}
                setMonth={setMonth}
                setYear={setYear}
            />
        </>
    );
}