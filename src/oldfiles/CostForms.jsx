import { CostForm } from './CostForm'

export function CostForms() {
    return (
        <div className="form-container">
            <CostForm isIncome={true} />
            <CostForm isIncome={false} />
        </div>
    );
}