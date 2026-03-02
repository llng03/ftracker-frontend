import { CostForm } from './CostForm.jsx'
import './CostForms.css'

export function CostForms({ onSuccess, year, month, categories, correctMode, user }) {
    return (
        <div className="form-container">
            <CostForm 
                income={true}
                onSuccess={onSuccess}
                year={year}
                month={month}
                categories={categories}
                correctMode={correctMode}
                user = {user}
            />
            <CostForm 
                income={false}
                onSuccess={onSuccess}
                year={year}
                month={month}
                categories={categories}
                correctMode={correctMode}
                user = {user}
            />
        </div>
    );
}