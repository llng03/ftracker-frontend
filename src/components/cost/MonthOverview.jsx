import { useState, useEffect } from 'react';
import { getMonthOverview, createFixedCost } from '../../api/costApi.js'
import { MonthHeader } from './MonthHeader.jsx';
import { CostTables } from './CostTables.jsx' ;
import { TopButtons } from './TopButtons.jsx';
import { OverviewModal } from './OverviewModal.jsx';
import { ToPotsModal } from './ToPotsModal.jsx';
import { FixedCostFormModal } from './FixedCostFormModal.jsx'
import { CostForms } from './CostForms.jsx'
import { FixedCostFormButtons } from './FixedCostFormButtons.jsx';

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
            />

            <FixedCostFormButtons
                setShowFixedIncomeForm={setShowFixedIncomeForm}
                setShowFixedExpForm={setShowFixedExpForm}
            />

            <CostTables 
                allMonthsIncome = {monthData.allMonthsIncome}
                allMonthsExpense = {monthData.allMonthsExpense}
                sumIn = {monthData.sumIn}
                sumOut = {monthData.sumOut}
                difference = {monthData.difference}
                correctMode = {correctMode}
                year= {year}
                month= {month}
                loadMonthOverview = {loadMonthOverview}
            />

            {showOverview && (
                <OverviewModal 
                    setShowOverview = {setShowOverview}
                    fixedIncome = {monthData.fixedIncome}
                    fixedExpense = {monthData.fixedExpense}
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
                    setShowFixedCostForm = {setShowFixedIncomeForm}
                    createFixedCost = {createFixedCost}
                    isIncome = {true}
                    onSuccess={loadMonthOverview}
                />
            )}

            {showFixedExpForm && (
                <FixedCostFormModal
                    setShowFixedCostForm = {setShowFixedExpForm}
                    createFixedCost = {createFixedCost}
                    isIncome = {false}
                    onSuccess={loadMonthOverview}
                />
            )}
        </div>
    );
}