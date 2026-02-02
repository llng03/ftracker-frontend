import { TopButtonsPots } from './TopButtonsPots.jsx'
import { getPotOverview } from '../../api/potApi.js'
import { PotContainer } from './PotContainer.jsx'
import { DistributeModal } from './DistributeModal.jsx'
import { CreatePotModal } from './CreatePotModal.jsx'
import { useState, useEffect } from 'react'

export function PotOverview() {
    const [potData, setPotData] = useState(null);

    const[showDistributeModal, setShowDistributeModal] = useState(false);
    const[showCreatePotModal, setShowCreatePotModal] = useState(false);

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
            />

            <h2>Unverteilt: {potData.undistributed.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>
            <h2>Summe: {potData.sumTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>

            <PotContainer  
                pots={potData.pots} 
                loadPotOverview = {loadPotOverview}
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