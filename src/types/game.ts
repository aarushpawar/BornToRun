export interface Race {
  id: string;
  name: string;
  distance: number;
  terrain: string;
  checkpoints: { mile: number; name: string }[];
  rules: string[];
  description: string;
  image: string; // Path to race image
}

export interface Character {
  id: string;
  name: string;
  stamina: number; // Overall endurance
  hydration: number; // Hydration management efficiency
  speed: number; // Raw pace potential
  technique: number; // Skill on terrain, efficiency
  heatResistance: number; // Performance in heat
  experience: number; // Ultra/mental experience
  image: string; // Path to character image
  // Add other character stats here
}

export interface Consequence {
  stamina?: number;
  hydration?: number;
  time?: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  options: { id: string; name: string; consequence?: Consequence }[];
  // Add other event properties here
}

export interface Decision {
  id: string;
  name: string;
  description: string;
  // Add other decision properties here
}

export type GamePhase = 'character_select' | 'race_select' | 'in_race' | 'race_over';

import { CharacterInteraction } from '../data/interactions/characterInteractions'; // Import CharacterInteraction

export interface GameContextType {
  race: Race;
  selectedRace: Race | null; // Race can be null before selection
  player: Character | null; // Player can be null before selection
  availableCharacters: Character[];
  gamePhase: GamePhase;
  currentEvent: Event | null;
  currentDecision: Decision | null;
  currentInteraction: CharacterInteraction | null; // Add interaction to context type
  currentCheckpointIndex: number;
  distanceCovered: number;
  timeElapsed: number;
  setDistanceCovered: (distance: number) => void;
  setTimeElapsed: (time: number) => void;
  triggerEvent: (event: Event) => void;
  makeDecision: (decisionId: string) => void;
  selectRace: (race: Race) => void;
  selectCharacter: (character: Character) => void;
}
