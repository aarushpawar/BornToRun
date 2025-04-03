export interface Race {
  id: string;
  name: string;
  distance: number;
  terrain: string;
  checkpoints: { mile: number; name: string }[];
  rules: string[];
  description: string;
  image: string;
}

export interface Character {
  id: string;
  name: string;
  stamina: number;
  hydration: number;
  speed: number;
  technique: number;
  heatResistance: number;
  experience: number;
  image: string;
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
}

export interface Decision {
  id: string;
  name: string;
  description: string;
}

export type GamePhase = 'character_select' | 'race_select' | 'in_race' | 'race_over';

import { CharacterInteraction } from '../data/interactions/characterInteractions';

export interface GameContextType {
  race: Race;
  selectedRace: Race | null;
  player: Character | null;
  availableCharacters: Character[];
  gamePhase: GamePhase;
  currentEvent: Event | null;
  currentDecision: Decision | null;
  currentInteraction: CharacterInteraction | null;
  currentCheckpointIndex: number;
  distanceCovered: number;
  timeElapsed: number;
  setDistanceCovered: (distance: number) => void;
  goFaster: () => void;
  goSlower: () => void;
  drinkWater: () => void;
  currentPace: number;
  projectedFinishTime: string;
  statusEffects: string[];
  treatStatusEffect: (effect: string) => void;
  setTimeElapsed: (time: number) => void;
  triggerEvent: (event: Event) => void;
  makeDecision: (decisionId: string) => void;
  selectRace: (race: Race) => void;
  selectCharacter: (character: Character) => void;
}
