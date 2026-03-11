import { useState, useEffect } from 'react';
import { getMonthOverview } from '../../api/costApi.js'
import { MonthHeader } from '../MonthHeader.jsx';
import { TopButtons } from './TopButtons.jsx';
import { OverviewModal } from './modals/OverviewModal.jsx';
import { ToPotsModal } from './modals/ToPotsModal.jsx';
import { FixedCostFormModal } from './modals/FixedCostFormModal.jsx'
import { CostForms } from './CostForms.jsx'
import { FixedCostFormButtons } from './FixedCostFormButtons.jsx';
import { createFixedCost } from '../../api/costApi.js'
import { ShowCosts } from './ShowCosts.jsx';

export function MonthOverview() {
    const[monthData, setMonthData] = useState(null);
    const [showOverview, setShowOverview] = useState(false);
    const [showToPots, setShowToPots] = useState(false);
    const [showFixedIncomeForm, setShowFixedIncomeForm] = useState(false);
    const [showFixedExpForm, setShowFixedExpForm] = useState(false);
    const [correctMode, setCorrectMode] = useState(false);

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date ().getFullYear());

    function toggleCorrectMode () {
        setCorrectMode(!correctMode);
    }

    useEffect(() => {
        getMonthOverview(year, month)
        .then(response => {
            setMonthData(response.data);
        })
    }, [year, month]);

    const loadMonthOverview = async () => {
        setShowFixedExpForm(false);
        setShowFixedIncomeForm(false);
        setShowToPots(false);
        return getMonthOverview(year, month)
            .then(response => {
                setMonthData(response.data);
        });
    };

    if (!monthData) {
        return <p>Lade Monatsdaten…</p>;
    }

    return (
        <div>
            {correctMode && (
                 <div className="page-overlay"></div>
            )}

            <MonthHeader 
                currMonth = {month}
                currYear = {year}
                setMonth = {setMonth}
                setYear = {setYear}
            />

            <TopButtons 
                setShowOverview = {setShowOverview}
                setShowToPots = {setShowToPots}
                correctMode = {correctMode}
                toggleCorrectMode = {toggleCorrectMode}
            />

            {correctMode && (
                <>
                    <div className="page-overlay"></div>
                    <p className="correct-mode-warning">{
                        "Du befindest dich im Korrekturmodus. " +
                        "Du solltest ihn nur verwenden, " +
                        "um versehentlich falsch eingegebene Eingaben zu korrigieren " +
                        "oder rückgängig zu machen. " +
                        "Nutze ihn nicht, um echte Änderungen an laufenden Kosten vorzunehmen, " +
                        "damit die vergangenen Monate weiterhin korrekt bleiben."
                    }</p>
                </>

            )}

            <CostForms 
                onSuccess={loadMonthOverview}
                year={year}
                month={month}
                categories={monthData.allCategories}
                correctMode={correctMode}
                loadMonthOverview = {loadMonthOverview}
            />

            <FixedCostFormButtons
                setShowFixedIncomeForm={setShowFixedIncomeForm}
                setShowFixedExpForm={setShowFixedExpForm}
                correctMode={correctMode}
            />

            <ShowCosts
                monthsIncome = {monthData.monthsIncome}
                monthsExpense = {monthData.monthsExpense}
                monthsFixedIncome = {monthData.monthsFixedIncome}
                monthsFixedExpense = {monthData.monthsFixedExpense}
                sumIn = {monthData.sumIn}
                sumOut = {monthData.sumOut}
                difference = {monthData.difference}
                correctMode = {correctMode}
                year = {year}
                month = {month}
                loadMonthOverview = {loadMonthOverview}
                categories={monthData.allCategories}
            />

            {showOverview && (
                <OverviewModal 
                    setShowOverview = {setShowOverview}
                    year = {year}
                    month = {month}
                    correctMode = {correctMode}
                    loadMonthOverview = {loadMonthOverview}
                />
            )}

            {showToPots && (
                <ToPotsModal 
                    setShowToPots = {setShowToPots}
                    year={year}
                    month={month}
                    onSuccess= {loadMonthOverview}
                />
            )}
            
            {showFixedIncomeForm && (
                <FixedCostFormModal 
                    showModal = {setShowFixedIncomeForm}
                    isIncome = {true}
                    onSuccess={loadMonthOverview}
                    sendData = {createFixedCost}
                    endMonth = {false}
                    change = {false}
                />
            )}

            {showFixedExpForm && (
                <FixedCostFormModal
                    showModal = {setShowFixedExpForm}
                    isIncome = {false}
                    onSuccess={loadMonthOverview}
                    sendData = {createFixedCost}
                    endMonth = {false}
                    change = {false}
                />
            )}
        </div>
    );
}