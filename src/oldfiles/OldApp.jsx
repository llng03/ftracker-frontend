import { useEffect, useState } from 'react';
import { getMonthOverview } from '../api/costApi.js';
import { CostTable } from './CostTable.jsx'
import { CostForms } from './CostForms.jsx'
import { FixedCostForm } from './FixedCostForm.jsx'
import './OldApp.css'


export function OldApp() {

  const[monthData, setMonthData] = useState(null);
  const[loading, setLoading] = useState(null);
  const[error, setError] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setLoading(true);

    getMonthOverview(year, month)
      .then(respone => {
        setMonthData(respone.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Fehler beim Laden der Monatsdaten");
      })
      .finally(() => {
        setLoading(false);
      });
    }, [year, month]);

  function openModalIn() {
    document.getElementById('modal-in').classList.remove('hidden');
  }

  function openModalOut() {
    document.getElementById('modal-out').classList.remove('hidden');
  }

  
 

  function closeModalToPots() {
    document.getElementById('modal-to-pots').classList.add('hidden');
  }

  

  function closeModalOverview() {
    document.getElementById('overview').classList.add('hidden');
  }

  function toggleDeleteColumns() {
    const deleteCols = document.querySelectorAll(".delete-col");
    deleteCols.forEach(col => col.classList.toggle("hidden"));
  }

  if(loading) { return <p> Loading... </p>; };
  if (error) { return <p> {error} </p>; };
  if (!monthData) return <p>Keine Daten verfügbar</p>;

  const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  function getMonthsString(monthNum) {
    return months[monthNum - 1];
  }

  const monthString = getMonthsString(monthData.currMonth);
  const monthYear = monthData.currYear;


  return (
    <div>
        <div className="month-header">
            <button
                className="arrow"
                onClick={() => {
                    setMonth(monthData.prevMonth); 
                    setYear(monthData.prevMonthsYear);
                }}>&#8592;
            </button>
            
            <h1> {monthString + ' ' + monthYear}</h1>

            <button
                className="arrow"
                onClick={() => {
                    setMonth(monthData.nextMonth); 
                    setYear(monthData.nextMonthsYear);
                }}>&#8594;
            </button>
        </div>

        <div className="top-button-container">
            <a href="/pots" className="top-button-link">&rarr; Zu den Pots</a>
            <div className="top-button-right">
                <button onClick={openModalOverview}>Überblick Feste Einnahmen und Ausgaben</button>
                <button onClick={openModalToPots}>Geld auf Pots verteilen</button>
                <button onClick={toggleDeleteColumns}>Löschen</button>
            </div>
        </div>

        <CostForms />

        <div className="fixed-cost-button-class">
            <button onClick={openModalIn}>+ Monatliche Einnahme hinzufügen</button>
            <button onClick={openModalOut}>+ Monatliche Ausgabe hinzufügen</button>
        </div>

        <FixedCostForm isIncome={true} />
        <FixedCostForm isIncome={false} />

        <div th:replace="fragments/toPotsForm:: toPots"></div>

        <div th:replace="fragments/overviewFixedTable:: overviewFixed"></div>

        <div className="diff">
            <b>Differenz: </b>
            <span>{monthData.difference.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
        </div>

        <div className="tables-container">
            <CostTable 
                costs={monthData.allMonthsIncome}
                sumIn={monthData.sumIn}
                sumOut={monthData.sumOut}
                isIncome={true}
            />
            <CostTable 
                costs={monthData.allMonthsExpense}
                sumIn={monthData.sumIn}
                sumOut={monthData.sumOut}
                isIncome={false}
            />
        </div>
    </div>
  );
}


