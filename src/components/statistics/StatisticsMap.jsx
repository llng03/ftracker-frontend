import { StatisticsBarChart } from "./StatisticsBarChart.jsx";
import { StatisticsPieChart } from "./StatisticsPieChart.jsx";
import { useState } from "react";

export function StatisticsMap({ categoryMap }) {
    const [showBarChart, setShowBarChart] = useState(false);

    const chartData = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Kategorie</th>
                        <th>Betrag</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryMap && (Object.entries(categoryMap).map(([category, sum]) =>(
                        <tr key={category}>
                            <td>{category}</td>
                            <td>{sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                        </tr>
                    )))}
                </tbody>
            </table>

            {showBarChart ? (
                <StatisticsBarChart data={chartData} />
            ) : (
                <StatisticsPieChart data={chartData} />
            )}
            <button onClick={() => setShowBarChart(!showBarChart)}>
                {showBarChart ? "Zum Tortendiagramm wechseln" : "Zum Balkendiagramm wechseln"}
            </button>
            
        </>


    );
}