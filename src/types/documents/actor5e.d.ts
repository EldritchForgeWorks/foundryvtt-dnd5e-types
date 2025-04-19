import { Actor } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/documents/actor';

/**
 * The DnD5e Actor5e class
 */
export declare class Actor5e extends Actor {
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
