import { FixedCostTable } from "./FixedCostTable"

export function FixedCostTables({ monthsFixedIncome, monthsFixedExpense }) {
    return (
        <div className="tables-container">
            <FixedCostTable
                fixedCosts={monthsFixedIncome}
                isIncome={true}
            />
            <FixedCostTable
                fixedCosts={monthsFixedExpense}
                isIncome={false}
            />
        </ div>
    )
}