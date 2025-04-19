/**
 * The DnD5e Combat5e class
 */
export declare class Combat5e extends Combat {
  /**
   * Get the combat's current combatant
   */
  getCurrentCombatant(): Combatant5e | null;

  /**
   * Get the combat's round
   */
  getRound(): number;

  /**
   * Get the combat's turn
   */
  getTurn(): number;
}
