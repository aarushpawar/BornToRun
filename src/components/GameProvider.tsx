'use client';

import React, { createContext, useState, useContext } from 'react';
import { Race, Character, Event, Decision, GamePhase, GameContextType } from '../types/game';
import copperCanyonUltra from '../data/races/copper_canyon';
// Removed playerCharacter import
import scottJurek from '../data/characters/scott_jurek';
import caballoBlanco from '../data/characters/caballo_blanco';
import arnulfoQuimare from '../data/characters/arnulfo_quimare';
import jennShelton from '../data/characters/jenn_shelton';
import billyBarnett from '../data/characters/billy_barnett';
import barefootTed from '../data/characters/barefoot_ted';
import ericOrton from '../data/characters/eric_orton';
import chrisMcDougall from '../data/characters/chris_mcdougall';
import annTrason from '../data/characters/ann_trason';
import blistersEvent from '../data/events/blisters';
import pacingDecision from '../data/decisions/pacing';

// Export the context itself
export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: React.ReactNode;
}

const allCharacters = [
  // Removed playerCharacter
  scottJurek,
  caballoBlanco,
  arnulfoQuimare,
  jennShelton,
  billyBarnett,
  barefootTed,
  ericOrton,
  chrisMcDougall,
  annTrason,
];

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [race, setRace] = useState<Race>(copperCanyonUltra);
  const [player, setPlayer] = useState<Character | null>(null); // Start with no player selected
  const [availableCharacters, setAvailableCharacters] = useState<Character[]>(allCharacters);
  const [gamePhase, setGamePhase] = useState<GamePhase>('character_select'); // Start at character select
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [distanceCovered, setDistanceCovered] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const selectCharacter = (character: Character) => {
    setPlayer(character);
    setGamePhase('in_race');
  };

  const triggerEvent = (event: Event) => {
    setCurrentEvent(event);
  };

  const makeDecision = (decisionId: string) => {
    if (currentEvent && player) { // Check if player exists
      const selectedOption = currentEvent.options.find((option) => option.id === decisionId);
      if (selectedOption) {
        // Apply consequence
        setPlayer((prevPlayer) => {
          if (!prevPlayer) return null; // Should not happen if player exists
          return {
            ...prevPlayer,
            stamina: prevPlayer.stamina + (selectedOption.consequence?.stamina || 0),
            hydration: prevPlayer.hydration + (selectedOption.consequence?.hydration || 0),
          };
        });
        setTimeElapsed((prevTime) => prevTime + (selectedOption.consequence?.time || 0));
      }
    }
    setCurrentDecision(null);
    setCurrentEvent(null);
  };

  const value: GameContextType = {
    race,
    player,
    availableCharacters,
    gamePhase,
    currentEvent,
    currentDecision,
    distanceCovered,
    timeElapsed,
    setDistanceCovered,
    setTimeElapsed,
    triggerEvent,
    makeDecision,
    selectCharacter,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Ensure useGame uses the locally defined and exported GameContext
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
