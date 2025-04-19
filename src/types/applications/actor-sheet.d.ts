import { ActorSheet } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/applications/actor-sheet';

/**
 * The DnD5e ActorSheet5e class
 */
export declare class ActorSheet5e extends ActorSheet {
  /**
   * Prepare base data for the actor
   */
  prepareBaseData(): void;

  /**
   * Prepare derived data for the actor
   */
  prepareDerivedData(): void;

  /**
   * Get the actor's data
   */
  getData(): Promise<Record<string, any>>;
}

/**
 * The DnD5e ActorSheet5eCharacter class
 */
export declare class ActorSheet5eCharacter extends ActorSheet5e {
  /**
   * Get the default options for this sheet
   */
  static get defaultOptions(): Record<string, any>;

  /**
   * Get the actor's data
   */
  getData(): Promise<Record<string, any>>;

  /**
   * Activate event listeners for the sheet
   */
  activateListeners(html: JQuery): void;
}

/**
 * The DnD5e ActorSheet5eNPC class
 */
export declare class ActorSheet5eNPC extends ActorSheet5e {
  /**
   * Get the default options for this sheet
   */
  static get defaultOptions(): Record<string, any>;

  /**
   * Get the actor's data
   */
  getData(): Promise<Record<string, any>>;

  /**
   * Activate event listeners for the sheet
   */
  activateListeners(html: JQuery): void;
}

/**
 * The DnD5e ActorSheet5eVehicle class
 */
export declare class ActorSheet5eVehicle extends ActorSheet5e {
  /**
   * Get the default options for this sheet
   */
  static get defaultOptions(): Record<string, any>;

  /**
   * Get the actor's data
   */
  getData(): Promise<Record<string, any>>;

  /**
   * Activate event listeners for the sheet
   */
  activateListeners(html: JQuery): void;
}
