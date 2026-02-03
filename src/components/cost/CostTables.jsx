import { CostTable } from "./CostTable";
import './CostTables.css'

export function CostTables({ allMonthsIncome, allMonthsExpense, sumIn, sumOut, 
    difference, correctMode, year, month, loadMonthOverview }) {
    return (
        <>
            <div className="diff">
                <b>Differenz: </b>
                <span>{Number(difference).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
            </div>
            <div className="tables-container">
                <CostTable 
                    costs = {allMonthsIncome}
                    sum = {sumIn}
                    isIncome = {true}
                    correctMode={correctMode}
                    year = {year}
                    month = {month}
                    loadMonthOverview = {loadMonthOverview}

                />
                <CostTable
                    costs = {allMonthsExpense}
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