import { useState } from "react";

export function useFixedCostModal({ fCost }) {
    const toMonthInputValue = (year, month) => {
        return `${year}-${String(month).padStart(2, '0')}`;
    };
    
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        descr: fCost.descr,
        amount: fCost.amount,
        frequency: fCost.frequency,
        startMonth: fCost.startMonth,
        endMonth: fCost.endMonth
    });
    return (
        form,
        setForm,
        error,
        setError
    );

}