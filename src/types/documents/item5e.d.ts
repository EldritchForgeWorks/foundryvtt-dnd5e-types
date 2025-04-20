import { Item } from '../foundry';

/**
 * The DnD5e Item5e class
 */
export declare class Item5e extends Item {
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
