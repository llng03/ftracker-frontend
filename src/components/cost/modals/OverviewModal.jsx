import { ModalShell } from '../../ModalShell.jsx'
import { OverviewTable } from '../OverviewTable.jsx'
import { useState, useEffect } from 'react'
import { getFixedCostOverview } from '../../../api/costApi.js' 

export function OverviewModal({ setShowOverview, year, month, correctMode, loadMonthOverview }) {
    const [fixedCosts, setFixedCosts] = useState([]);

    const reloadOverview = async () => {
        loadMonthOverview();
        return getFixedCostOverview(year, month)
            .then(response =>
                setFixedCosts(response.data)
            )
    }


    useEffect(() => {
        getFixedCostOverview(year, month)
            .then(response =>
                setFixedCosts(response.data)
            )
    }, [year, month]);

    const currentIncome = fixedCosts.currentFixedIncome || [];
    const currentExpense = fixedCosts.currentFixedExpense || [];
    const futureIncome = fixedCosts.futureFixedIncome || [];
    const futureExpense = fixedCosts.futureFixedExpense || [];
    const pastIncome = fixedCosts.pastFixedIncome || [];
    const pastExpense = fixedCosts.pastFixedExpense || [];

    return (
        <ModalShell onClose= {() => setShowOverview(false)} >
            <h1>Überblick</h1>
            <OverviewTable
                fixedCosts = {currentIncome}
                isIncome = {true}
                correctMode = {correctMode}
                reloadOverview={reloadOverview}
            />
            <OverviewTable
                fixedCosts = {currentExpense}
                isIncome = {false}
                correctMode = {correctMode}
                reloadOverview={reloadOverview}
            />

            <h2>Zukünftige Kosten</h2>
            <OverviewTable 
                fixedCosts = {futureIncome}
                isIncome = {true}
                correctMode = {correctMode}
                reloadOverview={reloadOverview}
            />
            <OverviewTable 
                fixedCosts = {futureExpense}
                isIncome = {false}
                correctMode = {correctMode}
                reloadOverview={reloadOverview}
            /> 

            <h2>Archiv</h2>
            <OverviewTable 
                fixedCosts = {pastIncome}
                isIncome = {true}
                correctMode = {correctMode}
                reloadOverview={reloadOverview}
            />
            <OverviewTable 
                fixedCosts = {pastExpense}
                isIncome = {false}
                correctMode = {correctMode}
                reloadOverview={reloadOverview}
            />
        </ModalShell>
    );
}