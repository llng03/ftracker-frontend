import { deleteFixedCost } from "../../api/costApi";
import {useState}  from 'react'
import { FixedCostFormModal } from "./modals/FixedCostFormModal";
import { updateFixedCost } from '../../api/costApi.js';
import { changeFixedCost } from '../../api/costApi.js';

export function OverviewTable({ fixedCosts, isIncome, correctMode, reloadOverview }) {
    const [showUpdateFixedCost, setShowUpdateFixedCost] = useState(null);
    const [showSetEndMonth, setShowSetEndMonth] = useState(null);;
    const [showChangeFixedCost, setShowChangeFixedCost] = useState(null);

    function handleDelete(costId) {
        if (window.confirm("Willst du diesen Eintrag wirklich löschen?")) {
            deleteFixedCost(costId)
                .then(() => reloadOverview())
                .catch(err => alert("Fehler beim Löschen: " + 
                    err.response?.data?.message || err.message
                ));
        }
    }
    function onPatchSuccess() {
        setShowUpdateFixedCost(null);
        setShowSetEndMonth(null);
        reloadOverview();
    }
    function toGermanString(frequency) {
        switch (frequency) {
            case "MONTHLY":
                return "monatlich";
            case "QUARTERLY":
                return "vierteljährlich";
            case "HALF_YEARLY":
                return "halbjährlich";
            case "YEARLY":
                return "jährlich";
            default:
                return frequency;
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>{isIncome ? "Einnahme": "Ausgabe"}</th>
                        <th>Betrag</th>
                        <th>Frequenz</th>
                        <th>Startmonat</th>
                        <th>Endmonat</th>
                        {correctMode &&
                            <>
                                <th></th>
                                <th>-</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {fixedCosts.map( fCost =>
                        <tr key={fCost.id}>
                            <td className={correctMode ? "correct-mode" : ""}>
                                <button 
                                    onClick = {() => setShowChangeFixedCost(fCost)}
                                    disabled = {correctMode}
                                >✏️</button>
                            </td>
                            <td>{fCost.descr}</td>
                            <td>{fCost.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                            <td>{toGermanString(fCost.frequency)}</td>
                            <td>{fCost.startYear + "-" + fCost.startMonth}</td>
                            <td>
                                {fCost.endMonth != null ? 
                                    fCost.endYear + "-" + fCost.endMonth : 
                                    <button onClick={() => setShowSetEndMonth(fCost)}>+</button>}
                            </td>
                            {correctMode &&
                                <>
                                    <td>
                                        <button className="correct-delete-btn" onClick={() => setShowUpdateFixedCost(fCost)}>🖌️</button>
                                    </td>
                                    <td>
                                        <button className="correct-delete-btn" onClick={() => handleDelete(fCost.id)}>x</button>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                            
                </tbody>
            </table>
            {showUpdateFixedCost && (
                <FixedCostFormModal
                    showModal = {setShowUpdateFixedCost}
                    onSuccess = {onPatchSuccess}
                    sendData = {updateFixedCost}
                    fCost = {showUpdateFixedCost}
                    endMonth = {false}
                    change = {false}
                />
            )}
             {showSetEndMonth && (
                <FixedCostFormModal
                    showModal = {setShowSetEndMonth}
                    onSuccess = {onPatchSuccess}
                    sendData = {updateFixedCost}
                    fCost = {showSetEndMonth}
                    endMonth = {true}
                    change = {false}
                />
            )}
            {showChangeFixedCost && (
                <FixedCostFormModal
                    showModal = {setShowChangeFixedCost}
                    onSuccess = {onPatchSuccess}
                    sendData = {changeFixedCost}
                    fCost = {showChangeFixedCost}
                    endMonth = {false}
                    change = {true}
                />
            )}
        </>)}