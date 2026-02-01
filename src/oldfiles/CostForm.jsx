export function CostForm({isIncome}) {

    return (
        <form method="post" th:object="${income}" th:action="@{/{currYear}/{currMonth}/income(currYear=${currYear}, currMonth=${currMonth})}">
        <h2>{isIncome ? "Einnahme" : "Ausgabe"}</h2>
        <div class="form-field">
            <label for="descrIn">{isIncome ? "Einnahme" : "Ausgabe"}:</label>
            <input type="text" id="descrIn" th:field="*{descr}" placeholder="z.B. Gehalt" />
            <div class="error" th:if="${#fields.hasErrors('descr')}" th:errors="*{descr}"></div>
        </div>

        <div class="form-field">
            <label for="costIn">Betrag (in €):</label>
            <input type="number" id="costIn" th:field="*{amount}" step="0.01" min="0" placeholder="z. B. 12.50" />
            <div class="error" th:if="${#fields.hasErrors('amount')}" th:errors="*{amount}"></div>
        </div>
        <input type="hidden" th:field="*{isIncome}" value="true" />

        <button type="submit">Hinzufügen</button>
        </form>
    );
}