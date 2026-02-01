import { CostTable } from "./CostTable";
import './CostTables.css'

export function CostTables({ allMonthsIncome, allMonthsExpense, sumIn, sumOut, difference }) {
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
                />
                <CostTable
                    costs = {allMonthsExpense}
                    sum = {sumOut}
                    isIncome = {false}
                />
            </div>
        </>

    );
}