import { CostTable } from "./CostTable";
import './CostTables.css'

export function CostTables({ allMonthsIncome, allMonthsExpense, sumIn, sumOut, difference, showDelColumn }) {
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
                    showDelColumn={showDelColumn}
                />
                <CostTable
                    costs = {allMonthsExpense}
                    sum = {sumOut}
                    isIncome = {false}
                    showDelColumn = {showDelColumn}
                />
            </div>
        </>

    );
}