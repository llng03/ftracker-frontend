import { CostTable } from "./CostTable";

export function CostTables({ monthsIncome, monthsExpense, sumIn, sumOut, 
    difference, correctMode, year, month, loadMonthOverview }) {
    return (
        <>
            <div className="diff">
                <b>Differenz: </b>
                <span>{Number(difference).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
            </div>
            <div className="tables-container">
                <CostTable 
                    costs = {monthsIncome}
                    sum = {sumIn}
                    isIncome = {true}
                    correctMode={correctMode}
                    year = {year}
                    month = {month}
                    loadMonthOverview = {loadMonthOverview}

                />
                <CostTable
                    costs = {monthsExpense}
                    sum = {sumOut}
                    isIncome = {false}
                    correctMode = {correctMode}
                    year = {year}
                    month = {month}
                    loadMonthOverview = {loadMonthOverview}
                />
            </div>
        </>

    );
}