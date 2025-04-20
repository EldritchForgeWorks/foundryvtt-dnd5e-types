import { ItemSheet } from '../foundry';

/**
 * The DnD5e ItemSheet5e class
 */
export declare class ItemSheet5e extends ItemSheet {
  /**
   * Prepare base data for the item
   */
  prepareBaseData(): void;

  /**
   * Prepare derived data for the item
   */
  prepareDerivedData(): void;

  /**
   * Get the item's data
   */
  getData(): Promise<Record<string, any>>;
}
