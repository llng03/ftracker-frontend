import { CostForm } from './CostForm.jsx'
import './CostForms.css'

export function CostForms({ onSuccess, year, month, categories, correctMode, loadMonthOverview }) {
    return (
        <div className="form-container">
            <CostForm 
                income={true}
                onSuccess={onSuccess}
                year={year}
                month={month}
                categories={categories}
                correctMode={correctMode}
                loadMonthOverview = {loadMonthOverview}
            />
            <CostForm 
                income={false}
                onSuccess={onSuccess}
                year={year}
                month={month}
                categories={categories}
                correctMode={correctMode}
                loadMonthOverview = {loadMonthOverview}
            />
        </div>
    );
}