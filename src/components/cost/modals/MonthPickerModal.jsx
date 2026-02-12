import { ModalShell } from "../../ModalShell";
import { useState } from "react";

export function MonthPickerModal({ setShowMonthPicker, setMonth, setYear }) {
    const getCurrentMonthValue = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };

    function jumpToMonth(monthValue) {
        setMonth(monthValue.split("-")[1]);
        setYear(monthValue.split("-")[0]);
        setShowMonthPicker(false);
    }

    const [navMonth, setNavMonth] = useState(getCurrentMonthValue);

    return (
        <ModalShell onClose={() => setShowMonthPicker(false)} >
            <input
                type="month"
                value={navMonth}
                onChange={(e) => setNavMonth(e.target.value)}
            />
            <button onClick={() => {jumpToMonth(navMonth)}}>Jump to {navMonth}</button>
        </ModalShell>
    )
}   