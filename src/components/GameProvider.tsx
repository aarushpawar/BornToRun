'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Race, Character, Event, Decision, GamePhase, GameContextType } from '../types/game';
import copperCanyonUltra from '../data/races/copper_canyon';
import scottJurek from '../data/characters/scott_jurek';
import caballoBlanco from '../data/characters/caballo_blanco';
import arnulfoQuimare from '../data/characters/arnulfo_quimare';
import jennShelton from '../data/characters/jenn_shelton';
import billyBarnett from '../data/characters/billy_barnett';
import barefootTed from '../data/characters/barefoot_ted';
import ericOrton from '../data/characters/eric_orton';
import chrisMcDougall from '../data/characters/chris_mcdougall';
import annTrason from '../data/characters/ann_trason';
import leadville100 from '../data/races/leadville_100';
import westernStates from '../data/races/western_states';
import blistersEvent from '../data/events/blisters';
import characterInteractions, { CharacterInteraction } from '../data/interactions/characterInteractions';
import pacingDecision from '../data/decisions/pacing';

// Export the context itself
export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: React.ReactNode;
}

const allCharacters = [
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
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [player, setPlayer] = useState<Character | null>(null);
  const [availableCharacters, setAvailableCharacters] = useState<Character[]>(allCharacters);
  const [gamePhase, setGamePhase] = useState<GamePhase>('character_select');
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [currentInteraction, setCurrentInteraction] = useState<CharacterInteraction | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [distanceCovered, setDistanceCovered] = useState<number>(0);
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState<number>(0);

  const selectRace = (race: Race) => {
    setSelectedRace(race);
    setGamePhase('in_race');
  };

  const selectCharacter = (character: Character) => {
    console.log('Character selected:', character.name);
    setPlayer(character);
    setGamePhase('race_select');
    console.log('Game phase updated to race_select');
  };

  const triggerEvent = (event: Event) => {
    setCurrentEvent(event);
  };

  const triggerRandomInteraction = () => {
    const randomIndex = Math.floor(Math.random() * characterInteractions.length);
    setCurrentInteraction(characterInteractions[randomIndex]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (gamePhase === 'in_race' && player) {
      intervalId = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
        const basePace = 7; // Fastest pace (minutes per mile)
        const statFactor = (player.speed * player.stamina * player.hydration) / 1000000;
        const paceRange = 4; // Range of pace (minutes per mile)
        const minutesPerMile = basePace + (paceRange * (1 - statFactor)); //Faster runners have a lower minutesPerMile
        setDistanceCovered((prevDistance) => {
          const newDistance = parseFloat((prevDistance + (1 / minutesPerMile)).toFixed(1));
          // Checkpoint logic
          if (selectedRace && currentCheckpointIndex < selectedRace.checkpoints.length) {
            const nextCheckpoint = selectedRace.checkpoints[currentCheckpointIndex];
            if (newDistance >= nextCheckpoint.mile) {
              setCurrentCheckpointIndex(currentCheckpointIndex + 1);
              triggerEvent(blistersEvent); // Trigger a default event for now
            }
          }
          return newDistance;
        });
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gamePhase, setTimeElapsed, setDistanceCovered, player, currentCheckpointIndex, selectedRace]);

  const makeDecision = (decisionId: string) => {
    if (currentEvent && player) {
      const selectedOption = currentEvent.options.find((option) => option.id === decisionId);
      if (selectedOption) {
        setPlayer((prevPlayer) => {
          if (!prevPlayer) return null;
          return {
            ...prevPlayer,
            stamina: prevPlayer.stamina + (selectedOption.consequence?.stamina || 0),
            hydration: prevPlayer.hydration + (selectedOption.consequence?.hydration || 0),
          };
        });
        setTimeElapsed((prevTime) => prevTime + (selectedOption.consequence?.time || 0));
        triggerRandomInteraction();
      }
      setCurrentDecision(null);
      setCurrentEvent(null);
    }
  };

  const value: GameContextType = {
    race,
    selectedRace,
    player,
    availableCharacters,
    gamePhase,
    currentEvent,
    currentDecision,
    currentInteraction,
    distanceCovered,
    currentCheckpointIndex,
    timeElapsed,
    setDistanceCovered,
    setTimeElapsed,
    triggerEvent,
    makeDecision,
    selectRace,
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
