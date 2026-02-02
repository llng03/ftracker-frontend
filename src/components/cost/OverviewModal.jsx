import { OverviewTable } from './OverviewTable.jsx'

export function OverviewModal({ setShowOverview, fixedIncome, fixedExpense }) {

    return (
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                    <button className="close" onClick={ () =>
                        setShowOverview(false)
                    }>&times;</button>
                    <h1>Überblick</h1>
                    <OverviewTable 
                        fixedCosts = {fixedIncome || []}
                        isIncome = {true}
                    />
                    <OverviewTable
                        fixedCosts = {fixedExpense || []}
                        isIncome = {false}
                    />
                </div>
            </div>
        </div>
    );
}