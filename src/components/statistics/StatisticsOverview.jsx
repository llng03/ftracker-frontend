import { MonthHeader } from "../MonthHeader";
import { useState, useEffect } from "react";
import { getStatisticsOverview } from "../../api/statisticsApi.js";
import { StatisticsMap } from "./StatisticsMap.jsx";
import { BackButton } from "./BackButton.jsx";
import { ExpenseSum } from "./ExpenseSum.jsx";

export function StatisticsOverview( {name} ) {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const[statisticsData, setStatisticsData] = useState(null);

    

    useEffect(() => {
        getStatisticsOverview(year, month)
        .then(response => {
            setStatisticsData(response.data);
        })
        .catch(err => console.error(err));
    }, [year, month]);

    /*const loadStatisticsOverview = async (year, month) => {
        return getStatisticsOverview(year, month)
            .then(response => {
                setStatisticsData(response.data);
            })
            .catch(err => console.error(err));
    };*/


    

    return (
        <>
            <h1>Statistiken</h1>
            <MonthHeader 
                currMonth={month}
                currYear={year}
                setMonth={setMonth}
                setYear={setYear}
            />
            <p>Hallo {name}, hier deine Statistiken.</p>
            <BackButton />
            <ExpenseSum 
                sum={statisticsData?.expenseSum ?? 0} 
                differenceSum={statisticsData?.differenceSum ?? 0}
            />
            <StatisticsMap
                categoryMap={statisticsData?.costSumPerCategory ?? {}}
            />

        </>
    );
}