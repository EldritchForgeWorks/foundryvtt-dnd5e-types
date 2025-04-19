/**
 * Custom sheets example for the DnD5e types
 */

/**
 * A custom character sheet that adds a special abilities tab
 */
class SpecialAbilitiesCharacterSheet extends dnd5e.applications.ActorSheet5eCharacter {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "sheet", "actor", "character", "special-abilities"],
      width: 720,
      height: 680,
      tabs: [
        { navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "abilities" }
      ]
    });
  }
  
  getData() {
    const data = super.getData();
    
    // Add custom data for special abilities
    data.specialAbilities = {
      daily: this.actor.getFlag("my-module", "dailyAbilities") || [],
      encounter: this.actor.getFlag("my-module", "encounterAbilities") || [],
      constant: this.actor.getFlag("my-module", "constantAbilities") || []
    };
    
    return data;
  }
  
  activateListeners(html: JQuery) {
    super.activateListeners(html);
    
    // Add listeners for special abilities
    html.find(".ability-create").click(this._onCreateAbility.bind(this));
    html.find(".ability-edit").click(this._onEditAbility.bind(this));
    html.find(".ability-delete").click(this._onDeleteAbility.bind(this));
    html.find(".ability-use").click(this._onUseAbility.bind(this));
  }
  
  _onCreateAbility(event: Event) {
    event.preventDefault();
    console.log("Creating new ability");
    // Implementation details...
  }
  
  _onEditAbility(event: Event) {
    event.preventDefault();
    const abilityId = event.currentTarget.dataset.abilityId;
    console.log(`Editing ability ${abilityId}`);
    // Implementation details...
  }
  
  _onDeleteAbility(event: Event) {
    event.preventDefault();
    const abilityId = event.currentTarget.dataset.abilityId;
    console.log(`Deleting ability ${abilityId}`);
    // Implementation details...
  }
  
  _onUseAbility(event: Event) {
    event.preventDefault();
    const abilityId = event.currentTarget.dataset.abilityId;
    console.log(`Using ability ${abilityId}`);
    // Implementation details...
  }
}

/**
 * A custom item sheet for special abilities
 */
class SpecialAbilityItemSheet extends dnd5e.applications.ItemSheet5e {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "sheet", "item", "special-ability"],
      width: 560,
      height: 400
    });
  }
  
  getData() {
    const data = super.getData();
    
    // Add custom data for special abilities
    data.abilityTypes = {
      daily: "Daily",
      encounter: "Per Encounter",
      constant: "Constant"
    };
    
    data.abilityType = this.item.getFlag("my-module", "abilityType") || "daily";
    data.abilityDescription = this.item.getFlag("my-module", "abilityDescription") || "";
    
    return data;
  }
  
  activateListeners(html: JQuery) {
    super.activateListeners(html);
    
    // Add listeners for special ability fields
    html.find(".ability-type").change(this._onAbilityTypeChange.bind(this));
  }
  
  _onAbilityTypeChange(event: Event) {
    event.preventDefault();
    const type = event.currentTarget.value;
    this.item.setFlag("my-module", "abilityType", type);
  }
  
  _updateObject(event: Event, formData: any) {
    // Save custom fields
    formData["flags.my-module.abilityType"] = this.item.getFlag("my-module", "abilityType");
    formData["flags.my-module.abilityDescription"] = formData.abilityDescription;
    
    // Call the parent method
    return super._updateObject(event, formData);
  }
}

// Register the custom sheets
Hooks.once("init", () => {
  Actors.registerSheet("dnd5e", SpecialAbilitiesCharacterSheet, {
    types: ["character"],
    makeDefault: false,
    label: "Character Sheet with Special Abilities"
  });
  
  Items.registerSheet("dnd5e", SpecialAbilityItemSheet, {
    types: ["feat"],
    makeDefault: false,
    label: "Special Ability Item Sheet"
  });
});
