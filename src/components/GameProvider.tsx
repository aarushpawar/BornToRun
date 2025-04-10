'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
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
import characterInteractions, { CharacterInteraction } from '../data/interactions/characterInteractions';
import pacingDecision from '../data/decisions/pacing';

export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode; // Explicitly define the type for 'children'
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
  const [pace, setPace] = useState<number>(7); // Default pace in minutes per mile
  const [currentPace, setCurrentPace] = useState<number>(7); // State for current pace
  const [projectedFinishTime, setProjectedFinishTime] = useState<string>('calculating...');
  const [statusEffects, setStatusEffects] = useState<string[]>([]); // Generic status effects state

  const selectRace = (race: Race): void => {
    setSelectedRace(race);
    setGamePhase('in_race');
  };

  const selectCharacter = (character: Character): void => {
    console.log('Character selected:', character.name);
    setPlayer(character);
    setGamePhase('race_select');
    console.log('Game phase updated to race_select');
  };

  const triggerEvent = (event: Event): void => {
    setCurrentEvent(event);
  };

const triggerRandomInteraction = (): void => {
    if (characterInteractions.length > 0) {
        const randomIndex = Math.floor(Math.random() * characterInteractions.length);
        setCurrentInteraction(characterInteractions[randomIndex]);
    }
};

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (gamePhase === 'in_race' && player) {
      intervalId = setInterval(() => {
        setTimeElapsed((prevTime: number) => prevTime + 1);
        const basePace = pace; // Use dynamic pace
        const statFactor = (player.speed * player.stamina * player.hydration) / 1000000;
        const paceRange = 4; // Range of pace (minutes per mile)
        const minutesPerMile = basePace + (paceRange * (1 - statFactor)); // Faster runners have a lower minutesPerMile
        const formatPace = (pace: number): string => {
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
setCurrentPace(minutesPerMile); // Update current pace as a number
console.log('Updated pace:', minutesPerMile, 'Updated distance:', distanceCovered);
        setDistanceCovered((prevDistance: number) => {
          const newDistance = parseFloat((prevDistance + (1 / minutesPerMile)).toFixed(1));
          if (selectedRace && currentCheckpointIndex < selectedRace.checkpoints.length) {
            // Checkpoint logic
            const nextCheckpoint = selectedRace.checkpoints[currentCheckpointIndex];
            if (newDistance >= nextCheckpoint.mile) {
              setCurrentCheckpointIndex(currentCheckpointIndex + 1);
            }
          }

          // Example status effect trigger - dehydration
          if (player.hydration <= 20 && !statusEffects.includes('dehydration')) {
            console.log('Dehydration triggered');
            setStatusEffects([...statusEffects, 'dehydration']);
          }

          // Example status effect trigger - blisters
          if (newDistance > 10 && !statusEffects.includes('blisters')) {
            console.log('Blisters triggered');
            setStatusEffects([...statusEffects, 'blisters']);
          }

          // Calculate projected finish time
          if (selectedRace) {
            const remainingDistance = selectedRace.distance - newDistance;
            const projectedMinutesRemaining = remainingDistance * minutesPerMile;
            const totalProjectedMinutes = timeElapsed + projectedMinutesRemaining;
            const finishTime = formatTime(totalProjectedMinutes);
            setProjectedFinishTime(finishTime);
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

  const makeDecision = (decisionId: string): void => {
    if (currentEvent && player && currentEvent.options.length > 0) {
      const selectedOption = currentEvent.options.find((option: any) => option.id === decisionId);
      if (selectedOption) {
        setPlayer((prevPlayer: Character | null) => {
          if (!prevPlayer) return null;
          return {
            ...prevPlayer,
            stamina: prevPlayer.stamina + (selectedOption.consequence?.stamina || 0),
            hydration: prevPlayer.hydration + (selectedOption.consequence?.hydration || 0),
          };
        });
        setTimeElapsed((prevTime: number) => prevTime + (selectedOption.consequence?.time || 0));
        triggerRandomInteraction();
      }
      setCurrentDecision(null);
      setCurrentEvent(null);
    }
  };

  const goFaster = (): void => {
    console.log('goFaster triggered: reducing pace and updating stats');
    setPace((prevPace: number) => Math.max(prevPace - 1, 6)); // Minimum pace is 6
    if (player) {
      setPlayer((prevPlayer: Character | null) => {
        if (!prevPlayer) return null;
        return {
          ...prevPlayer,
          stamina: Math.max(prevPlayer.stamina - 5, 0), // Adjusted stamina decrease
          hydration: Math.max(prevPlayer.hydration - 3, 0), // Adjusted hydration decrease
        };
      });
       setTimeElapsed((prevTime: number) => prevTime + 3); // Adjusted time penalty for going faster
    }
  };
  const goSlower = (): void => {
    console.log('goSlower triggered: increasing pace and updating stats');
    setPace((prevPace: number) => Math.min(prevPace + 1, 10)); // Maximum pace is 10
    if (player) {
      setPlayer((prevPlayer: Character | null) => {
        if (!prevPlayer) return null;
        return {
          ...prevPlayer,
          stamina: Math.min(prevPlayer.stamina + 2, 100), // Slight stamina recovery
          hydration: Math.min(prevPlayer.hydration + 1, 100), // Slight hydration recovery
        };
      });
    }
  };
  const drinkWater = (): void => {
    if (player) {
      setPlayer((prevPlayer: Character | null) => {
        if (!prevPlayer) return null;
        return {
          ...prevPlayer,
          hydration: Math.min(prevPlayer.hydration + 25, 100), // Restore hydration
          stamina: Math.min(prevPlayer.stamina + 5, 100), // Small stamina boost
        };
      });
      
      setTimeElapsed((prevTime: number) => prevTime + 8); // Adjusted time penalty for drinking water
    }
  };

  const treatStatusEffect = (effectToRemove: string): void => {
    setStatusEffects(statusEffects.filter((effect: string) => effect !== effectToRemove));
    setTimeElapsed((prevTime: number) => prevTime + 15); // Treating any status takes 15 minutes
    if (effectToRemove === 'blisters' && player) {
      setPlayer((prevPlayer: Character | null) => {
        if (!prevPlayer) return null;
        return {
          ...prevPlayer,
          stamina: Math.min(prevPlayer.stamina + 15, 100), // Increased stamina restoration for treating blisters
        };
      });
    } else if (effectToRemove === 'dehydration' && player) {
      setPlayer((prevPlayer: Character | null) => {
        if (!prevPlayer) return null;
        return {
          ...prevPlayer,
          hydration: Math.min(prevPlayer.hydration + 40, 100), // Increased hydration restoration for treating dehydration
        };
      });
    }
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins.toString().padStart(2, '0')}`;
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
    currentPace,
    projectedFinishTime,
    statusEffects,
    treatStatusEffect,
    goFaster,
    goSlower,
    drinkWater,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Ensure useGame uses the locally defined and exported GameContext
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
