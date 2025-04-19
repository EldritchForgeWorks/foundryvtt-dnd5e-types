/**
 * The DnD5e Combatant5e class
 */
export declare class Combatant5e extends Combatant {
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
