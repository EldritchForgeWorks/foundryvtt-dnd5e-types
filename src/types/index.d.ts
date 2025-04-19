/**
 * Type definitions for the DnD5e system in Foundry VTT
 *
 * This module provides TypeScript type definitions for the DnD5e system in Foundry VTT.
 * It is designed to be used alongside the @league-of-foundry-developers/foundry-vtt-types package.
 */

// Re-export all types from the various modules
import * as Documents from './documents';
import * as Data from './data';
import * as Config from './config';
import * as Dice from './dice';
import * as Applications from './applications';
import * as Utils from './utils';

// Declare the global dnd5e namespace
declare global {
  /**
   * The global dnd5e namespace
   */
  namespace dnd5e {
    export import documents = Documents;
    export import data = Data;
    export import config = Config;
    export import dice = Dice;
    export import applications = Applications;
    export import utils = Utils;
  }

  // Extend the global game object with dnd5e-specific properties
  interface Game {
    dnd5e: {
      /**
       * The dnd5e configuration object
       */
      config: typeof CONFIG.DND5E;

      /**
       * The dnd5e dice roller
       */
      dice: typeof dnd5e.dice;

      /**
       * The dnd5e macro API
       */
      macros: {
        rollItemMacro: (itemName: string) => Promise<void>;
        rollAbilityMacro: (abilityName: string) => Promise<void>;
        rollSkillMacro: (skillName: string) => Promise<void>;
      };

      /**
       * The dnd5e utility functions
       */
      utils: typeof dnd5e.utils;
    };
  }

  // Extend the CONFIG object with DND5E property
  interface CONFIG {
    DND5E: dnd5e.config.DND5EConfig;
  }
}

export { Documents, Data, Config, Dice, Applications, Utils };
