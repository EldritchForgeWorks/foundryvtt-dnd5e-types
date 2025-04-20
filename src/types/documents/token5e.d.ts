import { Token } from '../foundry';
import { Actor5e } from './actor5e';

/**
 * The DnD5e Token5e class
 */
export declare class Token5e extends Token {
  /**
   * Get the token's actor
   */
  getActor(): Actor5e | null;

  /**
   * Get the token's position
   */
  getPosition(): { x: number; y: number };

  /**
   * Get the token's dimensions
   */
  getDimensions(): { width: number; height: number };
}
