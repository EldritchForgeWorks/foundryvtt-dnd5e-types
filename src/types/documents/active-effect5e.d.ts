/**
 * The DnD5e ActiveEffect5e class
 */
export declare class ActiveEffect5e extends ActiveEffect {
  /**
   * Get the effect's duration
   */
  getDuration(): Record<string, any>;

  /**
   * Get the effect's source
   */
  getSource(): Record<string, any>;

  /**
   * Get the effect's target
   */
  getTarget(): Actor5e | null;

}
