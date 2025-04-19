/**
 * The DnD5e ChatMessage5e class
 */
export declare class ChatMessage5e extends ChatMessage {
  /**
   * Get the message's roll data
   */
  getRollData(): Record<string, any>;

  /**
   * Get the message's roll
   */
  getRoll(): Roll | null;

  /**
   * Get the message's item
   */
  getItem(): Item5e | null;
}
