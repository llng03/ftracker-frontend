export function ToPotsModal({ setShowToPots }) {
    return (
        <div className="overlay">
            <div className="popup">
                <div className="modal-content">
                    <span className="close" onClick={() =>
                        setShowToPots(false)
                    }>&times;</span>
                    <form method="post" 
                    th:action="@{/{currYear}/{currMonth}/toPots (currYear=${currYear}, currMonth=${currMonth})}">
                        <label for="money-amount">Betrag: </label>
                        <input type="number" id="money-amount" name="amount" />

                        <div id ="potSelection">
                            <label for="potSelect">Pot: </label>
                            <select name="potSelect" id="potSelect">
                                <option value="">-- kein Pot --</option>
                                <option th:each="pot: ${pots}" th:text="*{pot.getName()}" th:value="${pot.name}" th:name="${pot.name}"></option>
                            </select>
                        </div>

                        <button type="submit">Abschicken</button>
                    </form>
                </div>
            </div>
        </div>
    );
}