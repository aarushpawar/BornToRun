"use client";

import React from 'react';
import { useGame } from '../components/GameProvider';
import RaceSelect from '../components/game/race/RaceSelect';
import CharacterSelect from '../components/game/character/CharacterSelect';

export default function Home() {
  const { distanceCovered, timeElapsed, player, currentEvent, gamePhase, makeDecision, currentInteraction, selectedRace, currentCheckpointIndex } = useGame(); // Add currentInteraction

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
            <h3 className="text-lg font-semibold mt-4">Event</h3>
            <p>{currentEvent ? currentEvent.description : 'No event'}</p>
            {currentEvent && (
              <ul>
                {currentEvent.options.map((option) => (
                  <li key={option.id}>
                    <button onClick={() => makeDecision(option.id)}>{option.name}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}
