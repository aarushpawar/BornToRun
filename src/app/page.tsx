"use client";

import React from 'react';
import { useGame } from '../components/GameProvider';
import RaceSelect from '../components/game/race/RaceSelect';
import CharacterSelect from '../components/game/character/CharacterSelect';

export default function Home() {
    const { distanceCovered, timeElapsed, player, currentEvent, gamePhase, makeDecision, currentInteraction, selectedRace, currentCheckpointIndex, goFaster, goSlower, drinkWater, currentPace, projectedFinishTime, statusEffects, treatStatusEffect } = useGame();

    if (gamePhase === 'character_select') {
        return <CharacterSelect />;
    }

    if (gamePhase === 'race_select') {
        return <RaceSelect />;
    }

    if (gamePhase === 'in_race' && player) {
        return (
            <div className="container mx-auto h-screen">
                
                <div className="md:flex h-full">
                    <div className="md:w-1/2 p-4 border-2 border-blue-500">
                        <h2 className="text-xl font-bold mb-2">Race Progress</h2>
                        <p>Distance: {distanceCovered} miles</p>
                        <p>Time: {Math.floor(timeElapsed / 60)}:{Math.floor(timeElapsed % 60).toString().padStart(2, '0')}</p>
                        <p>Pace: {currentPace.toFixed(2)} min/mile</p>
                        <p>Projected Finish: {projectedFinishTime}</p>
                        {selectedRace && selectedRace.checkpoints[currentCheckpointIndex] && (
                            <p>Next Checkpoint: {selectedRace.checkpoints[currentCheckpointIndex].name}</p>
                        )}
                    </div>
                    {currentInteraction && (
                        <div className="p-4 border-2 border-yellow-500 mt-4">
                            <h3 className="text-lg font-semibold">Interaction</h3>
                            <p>
                                <strong>{currentInteraction.character.name}:</strong> {currentInteraction.message}
                            </p>
                        </div>
                    )}
                    <div className="md:w-1/2 p-4 border-2 border-green-500">
                        <h3 className="text-lg font-semibold">Stats ({player.name})</h3>
                        <p>Stamina: {player.stamina}</p>
                        <p>Hydration: {player.hydration}</p>
                        <p>Pace: {currentPace.toFixed(2)} min/mile</p>
                        <h3 className="text-lg font-semibold mt-4">Status Effects</h3>
                        {statusEffects.length > 0 ? (
                            <ul>
                                {statusEffects.map((effect) => (
                                    <li key={effect}>{effect.charAt(0).toUpperCase() + effect.slice(1)}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No status effects</p>
                        )}
                        {statusEffects.length > 0 && (
                            <div className="flex justify-around mt-2">
                                <button
                                    onClick={() => treatStatusEffect(statusEffects[0])}
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
                                >
                                    Treat {statusEffects[0].charAt(0).toUpperCase() + statusEffects[0].slice(1)}
                                </button>
                                <button 
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                                    >
                                    Ignore
                                </button>
                            </div>
                        )}
                        <div className="flex justify-around mt-4">
                    <button onClick={goFaster} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Push Harder
                    </button>
                    <button onClick={goSlower} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Take It Easy
                    </button>
                    <button onClick={drinkWater} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        Drink Water
                    </button>
                </div>
                    </div>
                </div>
                 
            </div>
        );
    }

    return <div >Loading...</div>;
}
