import { ModalShell } from '../ModalShell.jsx'
import { OverviewTable } from './OverviewTable.jsx'

export function OverviewModal({ setShowOverview, fixedIncome, fixedExpense, correctMode, loadMonthOverview }) {

    return (
        <ModalShell onClose= {() => setShowOverview(false)} >
            <h1>Überblick</h1>
            <OverviewTable 
                fixedCosts = {fixedIncome || []}
                isIncome = {true}
                correctMode = {correctMode}
                loadMonthOverview={loadMonthOverview}
            />
            <OverviewTable
                fixedCosts = {fixedExpense || []}
                isIncome = {false}
                correctMode = {correctMode}
                loadMonthOverview={loadMonthOverview}
            />
        </ModalShell>
    );
}