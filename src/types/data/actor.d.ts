/**
 * Data types for DnD5e actors
 */

/**
 * The base actor data that is common to all actor types
 */
export interface ActorDataCommon {
  /**
   * The actor's abilities
   */
  abilities: Record<string, Ability>;

  /**
   * The actor's attributes
   */
  attributes: {
    /**
     * The actor's armor class
     */
    ac: {
      /**
       * The actor's armor class value
       */
      value: number;

      /**
       * The actor's armor class calculation formula
       */
      formula: string;
    };

    /**
     * The actor's hit points
     */
    hp: {
      /**
       * The actor's current hit points
       */
      value: number;

      /**
       * The actor's maximum hit points
       */
      max: number;

      /**
       * The actor's temporary hit points
       */
      temp: number;

      /**
       * The actor's temporary maximum hit points
       */
      tempmax: number;
    };

    /**
     * The actor's initiative
     */
    init: {
      /**
       * The actor's initiative bonus
       */
      value: number;

      /**
       * The actor's initiative bonus formula
       */
      formula: string;
    };

    /**
     * The actor's movement speeds
     */
    movement: {
      /**
       * The actor's walking speed
       */
      walk: number;

      /**
       * The actor's swimming speed
       */
      swim: number;

      /**
       * The actor's flying speed
       */
      fly: number;

      /**
       * The actor's climbing speed
       */
      climb: number;

      /**
       * The actor's burrowing speed
       */
      burrow: number;

      /**
       * Whether the actor can hover
       */
      hover: boolean;

      /**
       * Any special notes about the actor's movement
       */
      notes: string;
    };

    /**
     * The actor's senses
     */
    senses: {
      /**
       * The actor's darkvision range
       */
      darkvision: number;

      /**
       * The actor's blindsight range
       */
      blindsight: number;

      /**
       * The actor's tremorsense range
       */
      tremorsense: number;

      /**
       * The actor's truesight range
       */
      truesight: number;

      /**
       * Any special notes about the actor's senses
       */
      notes: string;
    };

    /**
     * The actor's spellcasting ability
     */
    spellcasting: string;

    /**
     * The actor's death saves
     */
    death: {
      /**
       * The number of death save successes
       */
      success: number;

      /**
       * The number of death save failures
       */
      failure: number;
    };

    /**
     * The actor's exhaustion level
     */
    exhaustion: number;

    /**
     * The actor's inspiration
     */
    inspiration: boolean;
  };

  /**
   * The actor's details
   */
  details: {
    /**
     * The actor's biography
     */
    biography: {
      /**
       * The actor's full biography
       */
      value: string;

      /**
       * The actor's public biography
       */
      public: string;
    };

    /**
     * The actor's alignment
     */
    alignment: string;

    /**
     * The actor's race
     */
    race: string;

    /**
     * The actor's background
     */
    background: string;

    /**
     * The actor's character level
     */
    level: number;

    /**
     * The actor's XP
     */
    xp: {
      /**
       * The actor's current XP
       */
      value: number;

      /**
       * The actor's minimum XP for their level
       */
      min: number;

      /**
       * The actor's maximum XP for their level
       */
      max: number;

      /**
       * The actor's XP percentage
       */
      pct: number;
    };
  };

  /**
   * The actor's traits
   */
  traits: {
    /**
     * The actor's size
     */
    size: string;

    /**
     * The actor's creature type
     */
    creatureType: string;

    /**
     * The actor's damage immunities
     */
    di: {
      /**
       * The actor's damage immunities
       */
      value: string[];

      /**
       * Any custom damage immunities
       */
      custom: string;
    };

    /**
     * The actor's damage resistances
     */
    dr: {
      /**
       * The actor's damage resistances
       */
      value: string[];

      /**
       * Any custom damage resistances
       */
      custom: string;
    };

    /**
     * The actor's damage vulnerabilities
     */
    dv: {
      /**
       * The actor's damage vulnerabilities
       */
      value: string[];

      /**
       * Any custom damage vulnerabilities
       */
      custom: string;
    };

    /**
     * The actor's condition immunities
     */
    ci: {
      /**
       * The actor's condition immunities
       */
      value: string[];

      /**
       * Any custom condition immunities
       */
      custom: string;
    };

    /**
     * The actor's languages
     */
    languages: {
      /**
       * The actor's languages
       */
      value: string[];

      /**
       * Any custom languages
       */
      custom: string;
    };
  };

  /**
   * The actor's currency
   */
  currency: {
    /**
     * The actor's platinum pieces
     */
    pp: number;

    /**
     * The actor's gold pieces
     */
    gp: number;

    /**
     * The actor's electrum pieces
     */
    ep: number;

    /**
     * The actor's silver pieces
     */
    sp: number;

    /**
     * The actor's copper pieces
     */
    cp: number;
  };

  /**
   * The actor's skills
   */
  skills: Record<string, Skill>;

  /**
   * The actor's spells
   */
  spells: {
    /**
     * The actor's spell slots
     */
    [key: string]: {
      /**
       * The actor's current spell slots
       */
      value: number;

      /**
       * The actor's maximum spell slots
       */
      max: number;

      /**
       * The actor's override spell slots
       */
      override?: number;
    };
  };

  /**
   * The actor's bonuses
   */
  bonuses: {
    /**
     * The actor's ability check bonuses
     */
    abilities: {
      /**
       * The actor's ability check bonus
       */
      check: string;

      /**
       * The actor's ability save bonus
       */
      save: string;

      /**
       * The actor's ability skill bonus
       */
      skill: string;
    };

    /**
     * The actor's spell bonuses
     */
    spell: {
      /**
       * The actor's spell DC bonus
       */
      dc: string;

      /**
       * The actor's spell attack bonus
       */
      attack: string;

      /**
       * The actor's spell damage bonus
       */
      damage: string;
    };

    /**
     * The actor's weapon bonuses
     */
    weapon: {
      /**
       * The actor's weapon attack bonus
       */
      attack: string;

      /**
       * The actor's weapon damage bonus
       */
      damage: string;
    };
  };

  /**
   * The actor's resources
   */
  resources: {
    /**
     * The actor's primary resource
     */
    primary: {
      /**
       * The actor's primary resource value
       */
      value: number;

      /**
       * The actor's primary resource maximum
       */
      max: number;

      /**
       * Whether the actor's primary resource recharges on a short rest
       */
      sr: boolean;

      /**
       * Whether the actor's primary resource recharges on a long rest
       */
      lr: boolean;

      /**
       * The actor's primary resource label
       */
      label: string;
    };

    /**
     * The actor's secondary resource
     */
    secondary: {
      /**
       * The actor's secondary resource value
       */
      value: number;

      /**
       * The actor's secondary resource maximum
       */
      max: number;

      /**
       * Whether the actor's secondary resource recharges on a short rest
       */
      sr: boolean;

      /**
       * Whether the actor's secondary resource recharges on a long rest
       */
      lr: boolean;

      /**
       * The actor's secondary resource label
       */
      label: string;
    };

    /**
     * The actor's tertiary resource
     */
    tertiary: {
      /**
       * The actor's tertiary resource value
       */
      value: number;

      /**
       * The actor's tertiary resource maximum
       */
      max: number;

      /**
       * Whether the actor's tertiary resource recharges on a short rest
       */
      sr: boolean;

      /**
       * Whether the actor's tertiary resource recharges on a long rest
       */
      lr: boolean;

      /**
       * The actor's tertiary resource label
       */
      label: string;
    };
  };
}

/**
 * The character actor data
 */
export interface CharacterData extends ActorDataCommon {
  /**
   * The character's attributes
   */
  attributes: ActorDataCommon['attributes'] & {
    /**
     * The character's proficiency bonus
     */
    prof: number;
  };

  /**
   * The character's details
   */
  details: ActorDataCommon['details'] & {
    /**
     * The character's background
     */
    background: string;

    /**
     * The character's personality traits
     */
    trait: string;

    /**
     * The character's ideals
     */
    ideal: string;

    /**
     * The character's bonds
     */
    bond: string;

    /**
     * The character's flaws
     */
    flaw: string;
  };

  /**
   * The character's traits
   */
  traits: ActorDataCommon['traits'] & {
    /**
     * The character's weapon proficiencies
     */
    weaponProf: {
      /**
       * The character's weapon proficiencies
       */
      value: string[];

      /**
       * Any custom weapon proficiencies
       */
      custom: string;
    };

    /**
     * The character's armor proficiencies
     */
    armorProf: {
      /**
       * The character's armor proficiencies
       */
      value: string[];

      /**
       * Any custom armor proficiencies
       */
      custom: string;
    };

    /**
     * The character's tool proficiencies
     */
    toolProf: {
      /**
       * The character's tool proficiencies
       */
      value: string[];

      /**
       * Any custom tool proficiencies
       */
      custom: string;
    };
  };
}

/**
 * The NPC actor data
 */
export interface NPCData extends ActorDataCommon {
  /**
   * The NPC's attributes
   */
  attributes: ActorDataCommon['attributes'] & {
    /**
     * The NPC's proficiency bonus
     */
    prof: number;

    /**
     * The NPC's challenge rating
     */
    cr: number;

    /**
     * The NPC's spellcasting level
     */
    spellLevel: number;
  };

  /**
   * The NPC's details
   */
  details: ActorDataCommon['details'] & {
    /**
     * The NPC's type
     */
    type: {
      /**
       * The NPC's type
       */
      value: string;

      /**
       * The NPC's subtype
       */
      subtype: string;

      /**
       * Whether the NPC is a swarm
       */
      swarm: string;

      /**
       * The NPC's swarm size
       */
      swarmSize: string;
    };

    /**
     * The NPC's environment
     */
    environment: string;

    /**
     * The NPC's challenge rating
     */
    cr: number;

    /**
     * The NPC's source
     */
    source: string;
  };
}

/**
 * The vehicle actor data
 */
export interface VehicleData extends ActorDataCommon {
  /**
   * The vehicle's attributes
   */
  attributes: ActorDataCommon['attributes'] & {
    /**
     * The vehicle's armor class
     */
    ac: {
      /**
       * The vehicle's armor class value
       */
      value: number;

      /**
       * The vehicle's armor class calculation formula
       */
      formula: string;

      /**
       * The vehicle's motionless armor class
       */
      motionless: string;
    };

    /**
     * The vehicle's actions
     */
    actions: {
      /**
       * The vehicle's number of actions
       */
      value: number;

      /**
       * The vehicle's maximum number of actions
       */
      max: number;

      /**
       * The vehicle's threshold for losing actions
       */
      thresholds: {
        /**
         * The vehicle's threshold for losing its first action
         */
        0: number;

        /**
         * The vehicle's threshold for losing its second action
         */
        1: number;

        /**
         * The vehicle's threshold for losing its third action
         */
        2: number;
      };
    };

    /**
     * The vehicle's capacity
     */
    capacity: {
      /**
       * The vehicle's creature capacity
       */
      creature: string;

      /**
       * The vehicle's cargo capacity
       */
      cargo: number;
    };
  };

  /**
   * The vehicle's details
   */
  details: ActorDataCommon['details'] & {
    /**
     * The vehicle's type
     */
    type: {
      /**
       * The vehicle's type
       */
      value: string;

      /**
       * The vehicle's subtype
       */
      subtype: string;
    };

    /**
     * The vehicle's source
     */
    source: string;

    /**
     * The vehicle's crew
     */
    crew: string;

    /**
     * The vehicle's passengers
     */
    passengers: string;
  };

  /**
   * The vehicle's traits
   */
  traits: ActorDataCommon['traits'] & {
    /**
     * The vehicle's dimensions
     */
    dimensions: {
      /**
       * The vehicle's length
       */
      length: number;

      /**
       * The vehicle's width
       */
      width: number;

      /**
       * The vehicle's height
       */
      height: number;

      /**
       * The vehicle's units
       */
      units: string;
    };
  };
}

/**
 * The actor data type
 */
export type ActorData = CharacterData | NPCData | VehicleData;

/**
 * An ability score
 */
export interface Ability {
  /**
   * The ability score value
   */
  value: number;

  /**
   * The ability score proficiency
   */
  proficient: number;

  /**
   * The ability score bonus
   */
  bonus: number;

  /**
   * The ability score modifier
   */
  mod: number;

  /**
   * The ability score save
   */
  save: number;

  /**
   * The ability score DC
   */
  dc: number;
}

/**
 * A skill
 */
export interface Skill {
  /**
   * The skill value
   */
  value: number;

  /**
   * The skill ability
   */
  ability: string;

  /**
   * The skill bonus
   */
  bonus: number;

  /**
   * The skill modifier
   */
  mod: number;

  /**
   * The skill passive
   */
  passive: number;

  /**
   * The skill proficiency
   */
  prof: {
    /**
     * Whether the skill is proficient
     */
    hasProficiency: boolean;

    /**
     * The skill proficiency multiplier
     */
    multiplier: number;
  };

  /**
   * The skill total
   */
  total: number;
}
