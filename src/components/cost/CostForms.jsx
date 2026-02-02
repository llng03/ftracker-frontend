import { CostForm } from './CostForm.jsx'
import './CostForms.css'

export function CostForms({ onSuccess, year, month }) {
    return (
        <div className="form-container">
            <CostForm 
                isIncome={true}
                onSuccess={onSuccess}
                year={year}
                month={month}
            />
            <CostForm 
                isIncome={false}
                onSuccess={onSuccess}
                year={year}
                month={month}
            />
        </div>
    );
}