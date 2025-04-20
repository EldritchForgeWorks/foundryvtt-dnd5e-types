/**
 * Extensions to the Game object for the DnD5e system
 */

import { Game } from '../foundry';
import { DND5EConfig } from '../config';
import * as Dice from '../dice';
import * as Utils from '../utils';

/**
 * The DnD5e-specific properties and methods added to the Game object
 */
export interface DnD5eGame extends Game {
  /**
   * The DnD5e system namespace
   */
  dnd5e: {
    /**
     * The DnD5e configuration object
     */
    config: DND5EConfig;

    /**
     * The DnD5e dice roller
     */
    dice: {
      /**
       * Roll a d20 with advantage/disadvantage
       */
      d20Roll: typeof Dice.d20Roll;

      /**
       * Roll damage
       */
      damageRoll: typeof Dice.damageRoll;

      /**
       * Roll hit dice
       */
      hitDieRoll: typeof Dice.hitDieRoll;
    };

    /**
     * The DnD5e macro API
     */
    macros: {
      /**
       * Roll an item macro
       * @param itemName The name of the item to roll
       */
      rollItemMacro: (itemName: string) => Promise<void>;

      /**
       * Roll an ability macro
       * @param abilityName The name of the ability to roll
       */
      rollAbilityMacro: (abilityName: string) => Promise<void>;

      /**
       * Roll a skill macro
       * @param skillName The name of the skill to roll
       */
      rollSkillMacro: (skillName: string) => Promise<void>;
    };

    /**
     * The DnD5e utility functions
     */
    utils: typeof Utils;

    /**
     * The DnD5e version
     */
    version: string;

    /**
     * The DnD5e migration version
     */
    migrationVersion: string;

    /**
     * The DnD5e system ID
     */
    systemId: 'dnd5e';

    /**
     * The DnD5e system name
     */
    systemName: 'Dungeons & Dragons 5th Edition';
  };
}
