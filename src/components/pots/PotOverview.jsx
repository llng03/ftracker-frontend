import { TopButtonsPots } from './TopButtonsPots.jsx'
import { getPotOverview } from '../../api/potApi.js'
import { PotContainer } from './PotContainer.jsx'
import { DistributeModal } from './modals/DistributeModal.jsx'
import { CreatePotModal } from './modals/CreatePotModal.jsx'
import { useState, useEffect } from 'react'

export function PotOverview() {
    const [potData, setPotData] = useState(null);

    const[showDistributeModal, setShowDistributeModal] = useState(false);
    const[showCreatePotModal, setShowCreatePotModal] = useState(false);
    const [correctMode, setCorrectMode] = useState(false);


    function toggleCorrectMode () {
        setCorrectMode(!correctMode);
    }

    useEffect(() => {
        getPotOverview()
            .then(response => {
                setPotData(response.data);
            })
        }, []
    );

    const loadPotOverview = async () => {
        setShowCreatePotModal(false);
        setShowDistributeModal(false);
        return getPotOverview()
            .then(response => {
                setPotData(response.data);
        });
    };

    if (!potData) {
        return <p>Lade Pot-Daten...</p>;
    }

    return (
        <>

            <h1>Übersicht</h1>

            <TopButtonsPots 
                setShowDistributeModal={setShowDistributeModal}
                setShowCreatePotModal={setShowCreatePotModal}
                correctMode = {correctMode}
                toggleCorrectMode={toggleCorrectMode}
            />

            {correctMode && (
                <>
                    <div className="page-overlay"></div>
                    <p className="correct-mode-warning">{
                        "Du befindest dich im Korrekturmodus. " +
                        "Du solltest ihn nur verwenden, " +
                        "um versehentlich falsch eingegebene Eingaben zu korrigieren " +
                        "oder rückgängig zu machen." +
                        "Nutze ihn nicht, um echte Änderungen an laufenden Kosten vorzunehmen," +
                        "damit die vergangenen Monate weiterhin korrekt bleiben."
                    }</p>
                </>

            )}

            <h2>Unverteilt: {potData.undistributed.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>
            <h2>Summe: {potData.sumTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>

            <PotContainer  
                pots={potData.pots} 
                loadPotOverview = {loadPotOverview}
                correctMode = {correctMode}
            />

            {showDistributeModal && (
                <DistributeModal 
                    pots={potData.pots}
                    setShowDistributeModal={setShowDistributeModal}
                    onSuccess = {loadPotOverview}
                />
            )}

            {showCreatePotModal && (
                <CreatePotModal 
                    setShowCreatePotModal = {setShowCreatePotModal}
                    onSuccess = {loadPotOverview}
                />
            )}
        </>
    );
}