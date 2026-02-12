import { CostTables } from "./CostTables";
import { FixedCostTables } from "./FixedCostTables";
import { FixedCostTable } from "./FixedCostTable";
import { CostTable } from "./CostTable";
import './ShowCosts.css'

export function ShowCosts( { monthsIncome, monthsExpense, monthsFixedIncome, monthsFixedExpense, 
    sumIn, sumOut, difference, correctMode, year, month, loadMonthOverview }) {
    
    const differenceFixedCosts = () => {
        let fixedIncomeSum = monthsFixedIncome.reduce((acc, curr) => acc + Number(curr.amount), 0);
        let fixedExpenseSum = monthsFixedExpense.reduce((acc, curr) => acc + Number(curr.amount), 0);
        return fixedIncomeSum - fixedExpenseSum;
    }
    return (
        <>
            <div className="tables-grid">
                <FixedCostTable
                    fixedCosts = {monthsFixedIncome}
                    isIncome = {true}
                />
                <FixedCostTable
                    fixedCosts = {monthsFixedExpense}
                    isIncome = {false}
                />

                <p className="fixed-diff">
                    Zur Verfügung: {differenceFixedCosts().toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </p>

                <CostTable
                    costs = {monthsIncome}
                    sum = {sumIn}
                    isIncome = {true}
                    correctMode = {correctMode}
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
            <div className="diff">
                <b>Differenz: </b>
                <span>{Number(difference).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
            </div>
        </>
    );
}