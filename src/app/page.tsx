"use client";

import React from 'react';
import copperCanyonUltra from '../data/races/copper_canyon';
import { useGame } from '../components/GameProvider';
import CharacterSelect from '../components/game/character/CharacterSelect';

export default function Home() {
  const { distanceCovered, timeElapsed, player, currentEvent, gamePhase, makeDecision } = useGame(); // Add makeDecision

  if (gamePhase === 'character_select') {
    return <CharacterSelect />;
  }

  if (gamePhase === 'in_race' && player) {
    return (
      <div className="container mx-auto h-screen">
        <div className="md:flex h-full">
          <div className="md:w-1/2 p-4 border-2 border-blue-500">
            {/* Map Area */}
            <h2 className="text-xl font-bold mb-2">{copperCanyonUltra.name}</h2>
            <img src="https://via.placeholder.com/400x200" alt="Race Map" className="w-full h-48 object-cover" />
            <p>Current Location: [Display Location]</p>
          </div>
          <div className="md:w-1/2 p-4 border-2 border-green-500">
            {/* Info/Decision Area */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Stats ({player.name})</h3>
              <p>Distance: {distanceCovered} / {copperCanyonUltra.distance}</p>
              <p>Time: {timeElapsed}</p>
              <p>Stamina: {player.stamina}</p>
              <p>Hydration: {player.hydration}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Event</h3>
              <p>{currentEvent ? currentEvent.description : 'No event'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">What do you do?</h3>
              {currentEvent && (
                <ul className="space-y-2"> {/* Changed ol to ul for styling */}
                  {currentEvent.options.map((option: {id: string, name: string}) => (
                    <li key={option.id}>
                      <button
                        className="w-full px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 text-left" // Added text-left
                        onClick={() => makeDecision(option.id)} // Call makeDecision on click
                      >
                        {option.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle other game phases or loading state if needed
  return <div>Loading...</div>;
}
