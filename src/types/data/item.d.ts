/**
 * Data types for DnD5e items
 */

/**
 * The base item data that is common to all item types
 */
export interface ItemDataCommon {
  /**
   * The item's description
   */
  description: {
    /**
     * The item's description
     */
    value: string;

    /**
     * The item's chat description
     */
    chat: string;

    /**
     * The item's source
     */
    source: string;
  };

  /**
   * The item's source
   */
  source: string;

  /**
   * The item's quantity
   */
  quantity: number;

  /**
   * The item's weight
   */
  weight: number;

  /**
   * The item's price
   */
  price: number;

  /**
   * The item's attunement
   */
  attunement: number;

  /**
   * The item's equipped status
   */
  equipped: boolean;

  /**
   * The item's rarity
   */
  rarity: string;

  /**
   * The item's identified status
   */
  identified: boolean;

  /**
   * The item's activation
   */
  activation: {
    /**
     * The item's activation type
     */
    type: string;

    /**
     * The item's activation cost
     */
    cost: number;

    /**
     * The item's activation condition
     */
    condition: string;
  };

  /**
   * The item's duration
   */
  duration: {
    /**
     * The item's duration value
     */
    value: number;

    /**
     * The item's duration units
     */
    units: string;
  };

  /**
   * The item's target
   */
  target: {
    /**
     * The item's target value
     */
    value: number;

    /**
     * The item's target width
     */
    width: number;

    /**
     * The item's target units
     */
    units: string;

    /**
     * The item's target type
     */
    type: string;
  };

  /**
   * The item's range
   */
  range: {
    /**
     * The item's range value
     */
    value: number;

    /**
     * The item's long range
     */
    long: number;

    /**
     * The item's range units
     */
    units: string;
  };

  /**
   * The item's uses
   */
  uses: {
    /**
     * The item's current uses
     */
    value: number;

    /**
     * The item's maximum uses
     */
    max: number;

    /**
     * The item's uses per period
     */
    per: string;

    /**
     * The item's recovery formula
     */
    recovery: string;
  };

  /**
   * The item's ability
   */
  ability: string;

  /**
   * The item's action type
   */
  actionType: string;

  /**
   * The item's attack bonus
   */
  attackBonus: number;

  /**
   * The item's chat flavor
   */
  chatFlavor: string;

  /**
   * The item's critical threshold
   */
  critical: {
    /**
     * The item's critical threshold
     */
    threshold: number;

    /**
     * The item's critical damage
     */
    damage: string;
  };

  /**
   * The item's damage
   */
  damage: {
    /**
     * The item's damage parts
     */
    parts: Array<[string, string]>;

    /**
     * The item's versatile damage
     */
    versatile: string;
  };

  /**
   * The item's formula
   */
  formula: string;

  /**
   * The item's save
   */
  save: {
    /**
     * The item's save ability
     */
    ability: string;

    /**
     * The item's save DC
     */
    dc: number;

    /**
     * The item's save scaling
     */
    scaling: string;
  };

  /**
   * The item's requirements
   */
  requirements: string;

  /**
   * The item's recharge
   */
  recharge: {
    /**
     * The item's recharge value
     */
    value: number;

    /**
     * The item's charged status
     */
    charged: boolean;
  };
}

/**
 * The weapon item data
 */
export interface WeaponData extends ItemDataCommon {
  /**
   * The weapon's properties
   */
  properties: {
    /**
     * Whether the weapon is ammunition
     */
    amm: boolean;

    /**
     * Whether the weapon has the finesse property
     */
    fin: boolean;

    /**
     * Whether the weapon has the heavy property
     */
    hvy: boolean;

    /**
     * Whether the weapon has the light property
     */
    lgt: boolean;

    /**
     * Whether the weapon has the loading property
     */
    lod: boolean;

    /**
     * Whether the weapon has the reach property
     */
    rch: boolean;

    /**
     * Whether the weapon has the special property
     */
    spc: boolean;

    /**
     * Whether the weapon has the thrown property
     */
    thr: boolean;

    /**
     * Whether the weapon has the two-handed property
     */
    two: boolean;

    /**
     * Whether the weapon has the versatile property
     */
    ver: boolean;

    /**
     * Whether the weapon is a natural weapon
     */
    nat: boolean;

    /**
     * Whether the weapon is a magical weapon
     */
    mgc: boolean;

    /**
     * Whether the weapon is a silvered weapon
     */
    sil: boolean;

    /**
     * Whether the weapon is an adamantine weapon
     */
    ada: boolean;
  };

  /**
   * The weapon's proficiency
   */
  proficient: boolean;

  /**
   * The weapon's base weapon type
   */
  baseItem: string;
}

/**
 * The equipment item data
 */
export interface EquipmentData extends ItemDataCommon {
  /**
   * The equipment's armor class
   */
  armor: {
    /**
     * The equipment's armor class value
     */
    value: number;

    /**
     * The equipment's dexterity modifier
     */
    dex: number;

    /**
     * The equipment's strength requirement
     */
    str: number;

    /**
     * Whether the equipment gives stealth disadvantage
     */
    stealth: boolean;
  };

  /**
   * The equipment's speed
   */
  speed: {
    /**
     * The equipment's walking speed
     */
    value: number;

    /**
     * The equipment's walking speed units
     */
    units: string;
  };

  /**
   * The equipment's strength
   */
  strength: number;

  /**
   * The equipment's proficiency
   */
  proficient: boolean;

  /**
   * The equipment's base armor type
   */
  baseItem: string;
}

/**
 * The consumable item data
 */
export interface ConsumableData extends ItemDataCommon {
  /**
   * The consumable's consumable type
   */
  consumableType: string;

  /**
   * The consumable's uses
   */
  uses: ItemDataCommon['uses'] & {
    /**
     * Whether the consumable is automatically consumed
     */
    autoDestroy: boolean;
  };
}

/**
 * The tool item data
 */
export interface ToolData extends ItemDataCommon {
  /**
   * The tool's proficiency
   */
  proficient: number;

  /**
   * The tool's ability
   */
  ability: string;

  /**
   * The tool's base tool type
   */
  baseItem: string;
}

/**
 * The loot item data
 */
export interface LootData extends ItemDataCommon {
  faux: any;
  // No additional properties
}

/**
 * The container item data
 */
export interface ContainerData extends ItemDataCommon {
  /**
   * The container's capacity
   */
  capacity: {
    /**
     * The container's weight capacity
     */
    weight: number;

    /**
     * The container's item capacity
     */
    items: number;
  };

  /**
   * The container's currency
   */
  currency: {
    /**
     * The container's platinum pieces
     */
    pp: number;

    /**
     * The container's gold pieces
     */
    gp: number;

    /**
     * The container's electrum pieces
     */
    ep: number;

    /**
     * The container's silver pieces
     */
    sp: number;

    /**
     * The container's copper pieces
     */
    cp: number;
  };
}

/**
 * The spell item data
 */
export interface SpellData extends ItemDataCommon {
  /**
   * The spell's level
   */
  level: number;

  /**
   * The spell's school
   */
  school: string;

  /**
   * The spell's components
   */
  components: {
    /**
     * Whether the spell has a verbal component
     */
    vocal: boolean;

    /**
     * Whether the spell has a somatic component
     */
    somatic: boolean;

    /**
     * Whether the spell has a material component
     */
    material: boolean;

    /**
     * Whether the spell can be cast as a ritual
     */
    ritual: boolean;

    /**
     * Whether the spell requires concentration
     */
    concentration: boolean;
  };

  /**
   * The spell's materials
   */
  materials: {
    /**
     * The spell's material components
     */
    value: string;

    /**
     * Whether the spell's material components are consumed
     */
    consumed: boolean;

    /**
     * The cost of the spell's material components
     */
    cost: number;

    /**
     * The supply of the spell's material components
     */
    supply: number;
  };

  /**
   * The spell's preparation
   */
  preparation: {
    /**
     * The spell's preparation mode
     */
    mode: string;

    /**
     * Whether the spell is prepared
     */
    prepared: boolean;
  };

  /**
   * The spell's scaling
   */
  scaling: {
    /**
     * The spell's scaling mode
     */
    mode: string;

    /**
     * The spell's scaling formula
     */
    formula: string;
  };
}

/**
 * The feat item data
 */
export interface FeatData extends ItemDataCommon {
  /**
   * The feat's requirements
   */
  requirements: string;

  /**
   * The feat's recharge
   */
  recharge: {
    /**
     * The feat's recharge value
     */
    value: number;

    /**
     * The feat's charged status
     */
    charged: boolean;
  };
}

/**
 * The class item data
 */
export interface ClassData extends ItemDataCommon {
  /**
   * The class's identifier
   */
  identifier: string;

  /**
   * The class's levels
   */
  levels: number;

  /**
   * The class's hit dice
   */
  hitDice: string;

  /**
   * The class's hit dice used
   */
  hitDiceUsed: number;

  /**
   * The class's advancement
   */
  advancement: Array<{
    /**
     * The advancement's level
     */
    level: number;

    /**
     * The advancement's features
     */
    features: Array<{
      /**
       * The feature's name
       */
      name: string;

      /**
       * The feature's description
       */
      description: string;
    }>;
  }>;

  /**
   * The class's spellcasting
   */
  spellcasting: {
    /**
     * The class's spellcasting progression
     */
    progression: string;

    /**
     * The class's spellcasting ability
     */
    ability: string;
  };
}

/**
 * The background item data
 */
export interface BackgroundData extends ItemDataCommon {
  // No additional properties
  faux: any;
}

/**
 * The race item data
 */
export interface RaceData extends ItemDataCommon {
  // No additional properties
  faux: any;
}

/**
 * The item data for DnD5e items
 */
export type ItemData =
  | WeaponData
  | EquipmentData
  | ConsumableData
  | ToolData
  | LootData
  | ContainerData
  | SpellData
  | FeatData
  | ClassData
  | BackgroundData
  | RaceData;
