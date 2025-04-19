/**
 * Utility functions for the DnD5e system
 */

/**
 * Calculate the ability modifier for a given ability score
 */
export declare function calculateAbilityModifier(abilityScore: number): number;

/**
 * Calculate the proficiency bonus for a given level
 */
export declare function calculateProficiencyBonus(level: number): number;

/**
 * Calculate the XP required for a given level
 */
export declare function calculateXPForLevel(level: number): number;

/**
 * Calculate the level for a given XP amount
 */
export declare function calculateLevelForXP(xp: number): number;

/**
 * Calculate the CR for a given XP amount
 */
export declare function calculateCRForXP(xp: number): number;

/**
 * Calculate the XP for a given CR
 */
export declare function calculateXPForCR(cr: number): number;

/**
 * Calculate the spell level for a given character level and spell slot level
 */
export declare function calculateSpellLevel(characterLevel: number, spellSlotLevel: number): number;

/**
 * Calculate the spell slots for a given character level and spellcasting ability
 */
export declare function calculateSpellSlots(characterLevel: number, spellcastingAbility: string): Record<string, { value: number; max: number }>;

/**
 * Calculate the carrying capacity for a given strength score
 */
export declare function calculateCarryingCapacity(strengthScore: number): number;

/**
 * Calculate the encumbrance for a given weight and strength score
 */
export declare function calculateEncumbrance(weight: number, strengthScore: number): {
  value: number;
  max: number;
  pct: number;
  encumbered: boolean;
};

/**
 * Calculate the passive perception for a given wisdom score and proficiency bonus
 */
export declare function calculatePassivePerception(wisdomScore: number, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the passive investigation for a given intelligence score and proficiency bonus
 */
export declare function calculatePassiveInvestigation(intelligenceScore: number, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the passive insight for a given wisdom score and proficiency bonus
 */
export declare function calculatePassiveInsight(wisdomScore: number, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the passive stealth for a given dexterity score and proficiency bonus
 */
export declare function calculatePassiveStealth(dexterityScore: number, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the spell save DC for a given spellcasting ability and proficiency bonus
 */
export declare function calculateSpellSaveDC(spellcastingAbility: string, proficiencyBonus: number, abilityModifiers: Record<string, number>): number;

/**
 * Calculate the spell attack bonus for a given spellcasting ability and proficiency bonus
 */
export declare function calculateSpellAttackBonus(spellcastingAbility: string, proficiencyBonus: number, abilityModifiers: Record<string, number>): number;

/**
 * Calculate the initiative bonus for a given dexterity modifier
 */
export declare function calculateInitiativeBonus(dexterityModifier: number): number;

/**
 * Calculate the armor class for a given dexterity modifier and armor
 */
export declare function calculateArmorClass(dexterityModifier: number, armor: Item5e | null): number;

/**
 * Calculate the hit point maximum for a given constitution modifier and hit dice
 */
export declare function calculateHitPointMaximum(constitutionModifier: number, hitDice: Record<string, number>): number;

/**
 * Calculate the hit dice total for a given level and class
 */
export declare function calculateHitDiceTotal(level: number, classes: Item5e[]): Record<string, number>;

/**
 * Calculate the proficiency level for a given proficiency
 */
export declare function calculateProficiencyLevel(proficiency: string, proficiencies: Record<string, boolean>): number;

/**
 * Calculate the skill modifier for a given skill
 */
export declare function calculateSkillModifier(skill: string, abilityModifiers: Record<string, number>, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the save modifier for a given ability
 */
export declare function calculateSaveModifier(ability: string, abilityModifiers: Record<string, number>, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the attack bonus for a given weapon
 */
export declare function calculateAttackBonus(weapon: Item5e, abilityModifiers: Record<string, number>, proficiencyBonus: number, proficiencyLevel: number): number;

/**
 * Calculate the damage bonus for a given weapon
 */
export declare function calculateDamageBonus(weapon: Item5e, abilityModifiers: Record<string, number>): number;

/**
 * Calculate the damage for a given weapon
 */
export declare function calculateDamage(weapon: Item5e, abilityModifiers: Record<string, number>): {
  parts: Array<[string, string]>;
  versatile: string;
};

/**
 * Calculate the range for a given weapon
 */
export declare function calculateRange(weapon: Item5e): {
  value: number;
  long: number;
  units: string;
};

/**
 * Calculate the weight for a given item
 */
export declare function calculateWeight(item: Item5e): number;

/**
 * Calculate the price for a given item
 */
export declare function calculatePrice(item: Item5e): number;

/**
 * Calculate the quantity for a given item
 */
export declare function calculateQuantity(item: Item5e): number;

/**
 * Calculate the rarity for a given item
 */
export declare function calculateRarity(item: Item5e): string;

/**
 * Calculate the attunement for a given item
 */
export declare function calculateAttunement(item: Item5e): number;

/**
 * Calculate the activation for a given item
 */
export declare function calculateActivation(item: Item5e): {
  type: string;
  cost: number;
  condition: string;
};

/**
 * Calculate the duration for a given item
 */
export declare function calculateDuration(item: Item5e): {
  value: number;
  units: string;
};

/**
 * Calculate the target for a given item
 */
export declare function calculateTarget(item: Item5e): {
  value: number;
  width: number;
  units: string;
  type: string;
};

/**
 * Calculate the uses for a given item
 */
export declare function calculateUses(item: Item5e): {
  value: number;
  max: number;
  per: string;
};

/**
 * Calculate the ability for a given item
 */
export declare function calculateAbility(item: Item5e): string;

/**
 * Calculate the action type for a given item
 */
export declare function calculateActionType(item: Item5e): string;

/**
 * Calculate the attack bonus for a given item
 */
export declare function calculateItemAttackBonus(item: Item5e): number;

/**
 * Calculate the critical threshold for a given item
 */
export declare function calculateCriticalThreshold(item: Item5e): number;

/**
 * Calculate the damage for a given item
 */
export declare function calculateItemDamage(item: Item5e): {
  parts: Array<[string, string]>;
  versatile: string;
};

/**
 * Calculate the formula for a given item
 */
export declare function calculateFormula(item: Item5e): string;

/**
 * Calculate the save for a given item
 */
export declare function calculateSave(item: Item5e): {
  ability: string;
  dc: number;
  scaling: string;
};

/**
 * Calculate the properties for a given item
 */
export declare function calculateProperties(item: Item5e): Record<string, boolean>;

/**
 * Calculate the proficiency for a given item
 */
export declare function calculateItemProficiency(item: Item5e): number;

/**
 * Calculate the equipped status for a given item
 */
export declare function calculateEquipped(item: Item5e): boolean;

/**
 * Calculate the prepared status for a given item
 */
export declare function calculatePrepared(item: Item5e): boolean;

/**
 * Calculate the attuned status for a given item
 */
export declare function calculateAttuned(item: Item5e): boolean;

/**
 * Calculate the identified status for a given item
 */
export declare function calculateIdentified(item: Item5e): boolean;

/**
 * Calculate the charges for a given item
 */
export declare function calculateCharges(item: Item5e): {
  value: number;
  max: number;
};

/**
 * Calculate the spell level for a given item
 */
export declare function calculateItemSpellLevel(item: Item5e): number;

/**
 * Calculate the spell school for a given item
 */
export declare function calculateSpellSchool(item: Item5e): string;

/**
 * Calculate the spell components for a given item
 */
export declare function calculateSpellComponents(item: Item5e): {
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  ritual: boolean;
  concentration: boolean;
};

/**
 * Calculate the spell materials for a given item
 */
export declare function calculateSpellMaterials(item: Item5e): {
  value: string;
  consumed: boolean;
  cost: number;
  supply: number;
};

/**
 * Calculate the spell preparation mode for a given item
 */
export declare function calculateSpellPreparationMode(item: Item5e): string;

/**
 * Calculate the spell scaling mode for a given item
 */
export declare function calculateSpellScalingMode(item: Item5e): string;

/**
 * Calculate the requirements for a given item
 */
export declare function calculateRequirements(item: Item5e): string;

/**
 * Calculate the recharge for a given item
 */
export declare function calculateRecharge(item: Item5e): {
  value: number;
  charged: boolean;
};
