/**
 * Configuration data for the DnD5e system
 */

/**
 * The DnD5e configuration object
 */
export interface DND5EConfig {
  /**
   * The available ability scores
   */
  abilities: Record<string, string>;

  /**
   * The available ability score abbreviations
   */
  abilityAbbreviations: Record<string, string>;

  /**
   * The available ability score consumption targets
   */
  abilityConsumptionTypes: Record<string, string>;

  /**
   * The available actor sizes
   */
  actorSizes: Record<string, string>;

  /**
   * The available alignment options
   */
  alignments: Record<string, string>;

  /**
   * The available armor proficiency options
   */
  armorProficiencies: Record<string, string>;

  /**
   * The available armor types
   */
  armorTypes: Record<string, string>;

  /**
   * The available character levels
   */
  characterLevels: number[];

  /**
   * The available condition types
   */
  conditionTypes: Record<string, string>;

  /**
   * The available consumable types
   */
  consumableTypes: Record<string, string>;

  /**
   * The available creature types
   */
  creatureTypes: Record<string, string>;

  /**
   * The available damage types
   */
  damageTypes: Record<string, string>;

  /**
   * The available damage resistance types
   */
  damageResistanceTypes: Record<string, string>;

  /**
   * The available distance units
   */
  distanceUnits: Record<string, string>;

  /**
   * The available item action types
   */
  itemActionTypes: Record<string, string>;

  /**
   * The available item activation types
   */
  itemActivationTypes: Record<string, string>;

  /**
   * The available item capacity types
   */
  itemCapacityTypes: Record<string, string>;

  /**
   * The available item consumption types
   */
  itemConsumptionTypes: Record<string, string>;

  /**
   * The available item rarity types
   */
  itemRarity: Record<string, string>;

  /**
   * The available languages
   */
  languages: Record<string, string>;

  /**
   * The available limited use periods
   */
  limitedUsePeriods: Record<string, string>;

  /**
   * The available movement units
   */
  movementUnits: Record<string, string>;

  /**
   * The available movement types
   */
  movementTypes: Record<string, string>;

  /**
   * The available polymorph settings
   */
  polymorphSettings: Record<string, string>;

  /**
   * The available proficiency levels
   */
  proficiencyLevels: Record<number, string>;

  /**
   * The available sense types
   */
  senses: Record<string, string>;

  /**
   * The available skill proficiencies
   */
  skills: Record<string, string>;

  /**
   * The available spell components
   */
  spellComponents: Record<string, string>;

  /**
   * The available spell levels
   */
  spellLevels: Record<number, string>;

  /**
   * The available spell preparation modes
   */
  spellPreparationModes: Record<string, string>;

  /**
   * The available spell schools
   */
  spellSchools: Record<string, string>;

  /**
   * The available spell scaling modes
   */
  spellScalingModes: Record<string, string>;

  /**
   * The available target types
   */
  targetTypes: Record<string, string>;

  /**
   * The available time periods
   */
  timePeriods: Record<string, string>;

  /**
   * The available tool proficiencies
   */
  toolProficiencies: Record<string, string>;

  /**
   * The available tool types
   */
  toolTypes: Record<string, string>;

  /**
   * The available vehicle types
   */
  vehicleTypes: Record<string, string>;

  /**
   * The available weapon proficiencies
   */
  weaponProficiencies: Record<string, string>;

  /**
   * The available weapon properties
   */
  weaponProperties: Record<string, string>;

  /**
   * The available weapon types
   */
  weaponTypes: Record<string, string>;
}
