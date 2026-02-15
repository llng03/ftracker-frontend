import { CostForm } from './CostForm.jsx'
import './CostForms.css'

export function CostForms({ onSuccess, year, month, categories, correctMode }) {
    return (
        <div className="form-container">
            <CostForm 
                isIncome={true}
                onSuccess={onSuccess}
                year={year}
                month={month}
                categories={categories}
                correctMode={correctMode}
            />
            <CostForm 
                isIncome={false}
                onSuccess={onSuccess}
                year={year}
                month={month}
                categories={categories}
                correctMode={correctMode}
            />
        </div>
    );
}