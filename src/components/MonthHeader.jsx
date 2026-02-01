import './MonthHeader.css'

export function MonthHeader({ currMonth, currYear, setMonth, setYear }) {
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    function getMonthsString(monthNum) {
        return months[monthNum - 1];
    }

    const nextMonthsYear = (currMonth == 12 ? currYear + 1 : currYear);
    const nextMonth = (currMonth == 12 ? 1 : currMonth + 1);
    const prevMonthsYear = (currMonth == 1 ? currYear - 1 : currYear);
    const prevMonth = (currMonth == 1 ? 12 : currMonth - 1);

    return (
        <div className="month-header">
                <button
                    className="arrow"
                    onClick={() => {
                        setMonth(prevMonth); 
                        setYear(prevMonthsYear);
                    }}>&#8592;
                </button>
                
                <h1> {getMonthsString(currMonth) + ' ' + currYear}</h1>

                <button
                    className="arrow"
                    onClick={() => {
                        setMonth(nextMonth); 
                        setYear(nextMonthsYear);
                    }}>&#8594;
                </button>
            </div>
    );
}