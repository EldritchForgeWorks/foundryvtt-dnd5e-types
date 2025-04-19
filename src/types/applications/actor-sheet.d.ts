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
