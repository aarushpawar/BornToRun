// Player character stats
export interface PlayerStats {
  endurance: number;
  speed: number;
  mentalFortitude: number;
  hydration: number;
  nutrition: number;
  technique: number;
  adaptation: number;
  recovery: number;
}

// Player character
export interface Player {
  id: string;
  name: string;
  stats: PlayerStats;
  experience: number;
  completedRaces: string[];
}

// Race types
export enum RaceType {
  FIFTY_MILE = "50 Mile",
  HUNDRED_MILE = "100 Mile",
  MULTI_DAY = "Multi-day",
  COPPER_CANYON = "Copper Canyon Ultra"
}

// Race difficulty
export enum Difficulty {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
  EXPERT = "Expert"
}

// Race terrain types
export enum TerrainType {
  TRAIL = "Trail",
  MOUNTAIN = "Mountain",
  DESERT = "Desert",
  FOREST = "Forest",
  MIXED = "Mixed"
}

// Race definition
export interface Race {
  id: string;
  name: string;
  type: RaceType;
  distance: number; // in miles
  elevation: number; // in feet
  difficulty: Difficulty;
  terrain: TerrainType[];
  segments: RaceSegment[];
  description: string;
  imageUrl?: string;
  isFromBook: boolean;
}

// Race segment
export interface RaceSegment {
  id: string;
  name: string;
  distance: number; // in miles
  elevation: number; // in feet
  terrain: TerrainType;
  difficulty: Difficulty;
  description: string;
  possibleEvents: string[]; // IDs of possible events
}

// Event types
export enum EventType {
  ENVIRONMENTAL = "Environmental",
  PHYSICAL = "Physical",
  MENTAL = "Mental",
  SOCIAL = "Social",
  EQUIPMENT = "Equipment"
}

// Game event
export interface GameEvent {
  id: string;
  name: string;
  type: EventType;
  description: string;
  choices: EventChoice[];
  conditions?: EventCondition[]; // Conditions for this event to trigger
  isFromBook: boolean;
}

// Event choice
export interface EventChoice {
  id: string;
  text: string;
  outcomes: EventOutcome[];
}

// Event outcome
export interface EventOutcome {
  description: string;
  statChanges: Partial<PlayerStats>;
  probability: number; // 0-100
  nextEvent?: string; // ID of next event if applicable
}

// Event condition
export interface EventCondition {
  stat?: keyof PlayerStats;
  minValue?: number;
  maxValue?: number;
  segmentId?: string;
  distance?: number; // Minimum distance covered
  previousChoice?: string; // ID of a previous choice
}

// Game state
export interface GameState {
  player: Player;
  currentRace: Race | null;
  currentSegment: RaceSegment | null;
  distanceCovered: number;
  timeElapsed: number; // in minutes
  currentEvents: GameEvent[];
  gameLog: LogEntry[];
  inventory: InventoryItem[];
  gameStatus: GameStatus;
}

// Game status
export enum GameStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  PAUSED = "Paused",
  COMPLETED = "Completed",
  DNF = "Did Not Finish" // Did Not Finish
}

// Log entry
export interface LogEntry {
  timestamp: number;
  text: string;
  type: LogType;
}

// Log type
export enum LogType {
  INFO = "Info",
  EVENT = "Event",
  DECISION = "Decision",
  STAT_CHANGE = "Stat Change",
  MILESTONE = "Milestone"
}

// Inventory item
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  effects: Partial<PlayerStats>;
  quantity: number;
  isConsumable: boolean;
  isEquipped: boolean;
}

// Character from the book
export interface BookCharacter {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  relatedEvents: string[]; // IDs of events this character appears in
}

// Decision category
export enum DecisionCategory {
  PACING = "Pacing",
  NUTRITION = "Nutrition",
  REST = "Rest",
  ROUTE = "Route",
  GEAR = "Gear",
  MEDICAL = "Medical",
  MENTAL = "Mental"
}

// Decision
export interface Decision {
  id: string;
  category: DecisionCategory;
  text: string;
  choices: DecisionChoice[];
  conditions?: EventCondition[];
}

// Decision choice
export interface DecisionChoice {
  id: string;
  text: string;
  outcomes: EventOutcome[];
}
