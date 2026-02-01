import { useState } from 'react'


export function FixedCostForm({isIncome}) {
    const [endMonthToggled, setEndMonthToggled] = useState(true);

    function closeModalIn() {
        document.getElementById('modal-in').classList.add('hidden');
    }

    window.addEventListener("DOMContentLoaded", () => {
        toggleEndmonat();
    });

    function closeModalOut() {
        document.getElementById('modal-out').classList.add('hidden');
    }

    function toggleEndmonat() {
        const checkbox = document.getElementById("endToggle");
        if (checkbox.checked) {
            setEndMonthToggled(true);
            document.getElementById("endMonth").value = "";
        } else {
            setEndMonthToggled(false);
        }
    }
    return (
        <div>
            <div id={isIncome ? "modal-in" : "modal-out"} className="modal hidden">
                <div className="modal-content">
                    <span className="close" onClick={isIncome? closeModalIn : closeModalOut}>&times;</span>

                    <form method="post" th:object="${fixedExpense}" 
                        th:action="@{/{currYear}/{currMonth}/fixedExpense(currYear=${currYear}, currMonth=${currMonth})}"
                    >
                        <label for={isIncome? "descr-in" : "descr-out"}>{isIncome? "Einnahme" : "Ausgabe"}: </label>
                        <input type="text" id={isIncome ? "descr-in" : "descr-out"} th:field="*{descr}" placeholder="z.B. Miete" />
                        <div className="error" th:if="${#fields.hasErrors('descr')}" th:errors="*{descr}"></div>

                        <label for={isIncome ? "amount-in" : "amount-out"}>Betrag:</label>
                        <input type="number" id={isIncome ? "amount-in" : "amount-out"} th:field="*{amount}" step="0.01" min="0" />
                        <div class="error" th:if="${#fields.hasErrors('amount')}" th:errors="*{amount}"></div>

                        <input type="hidden" th:field="*{isIncome}" value={isIncome} />

                        <label for={isIncome ? "startMonatIn" : "startMonatOut"}>Startmonat:</label>
                        <input type="month" id={isIncome ? "startMonatIn" : "startMonatOut"} th:field="*{start}" required />

                        <label>
                            <input type="checkbox" id="endToggle" onChange={toggleEndmonat} checked />
                            Kein Endmonat (läuft unbefristet)
                        </label>

                        {!endMonthToggled && (
                            <div id="endmonth-section">
                                <label for="endMonth">Endmonat</label>
                                <input type="month" id="endMonth" th:field="*{endValue}" />
                            </div>
                        )}

                        {!isIncome && (
                        <div hidden>
                            <label for="freq">Häufigkeit: </label>
                            <select id="freq" th:field="*{frequency}">
                                <option th:each="option: ${T(de.ftracker.domain.model.costDTOs.Interval).values()}" 
                                th:value="${option}" 
                                th:text="${option.getLabel()}">Intervall</option>
                            </select>
                        </div>
                        )}
                        <button type="submit">Hinzufügen</button>
                    </form>
                </div>
            </div>
        </div>
    );
}