import { Application } from '../foundry';

/**
 * The DnD5e Dialog5e class
 */
export declare class Dialog5e extends Application {
  /**
   * Create a confirmation dialog
   */
  static confirm(options: Record<string, any>): Promise<boolean>;

  /**
   * Create a prompt dialog
   */
  static prompt(options: Record<string, any>): Promise<string>;

  /**
   * Submit the dialog
   */
  submit(options?: Record<string, any>): Promise<any>;
}
