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
import * as Foundry from './foundry';
import * as Game from './game';

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
    export import foundry = Foundry;
    export import game = Game;
  }

  // Extend the global game object with dnd5e-specific properties
  interface Game extends dnd5e.game.DnD5eGame {
    faux: string;
  }

  // Extend the CONFIG object with DND5E property
  interface CONFIG {
    DND5E: dnd5e.config.DND5EConfig;
  }
}

export { Documents, Data, Config, Dice, Applications, Utils, Foundry, Game };
