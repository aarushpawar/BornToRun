export interface Race {
  id: string;
  name: string;
  distance: number;
  terrain: string;
  checkpoints: { mile: number; name: string }[];
  rules: string[];
  description: string;
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

export type GamePhase = 'character_select' | 'in_race' | 'race_over';

export interface GameContextType {
  race: Race;
  player: Character | null; // Player can be null before selection
  availableCharacters: Character[];
  gamePhase: GamePhase;
  currentEvent: Event | null;
  currentDecision: Decision | null;
  distanceCovered: number;
  timeElapsed: number;
  setDistanceCovered: (distance: number) => void;
  setTimeElapsed: (time: number) => void;
  triggerEvent: (event: Event) => void;
  makeDecision: (decisionId: string) => void;
  selectCharacter: (character: Character) => void;
}
