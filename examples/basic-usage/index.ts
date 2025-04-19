/**
 * Basic usage example for the DnD5e types
 */

// Example: Access a DnD5e actor
const actor = game.actors.get("actor-id") as Game["actors"]["get"] & dnd5e.documents.Actor5e;
console.log(actor.system.attributes.ac.value);

// Example: Access a DnD5e item
const item = actor.items.get("item-id") as dnd5e.documents.Item5e;
console.log(item.system.damage.parts);

// Example: Access DnD5e configuration data
const abilities = CONFIG.DND5E.abilities;
console.log(abilities.str);

// Example: Use DnD5e dice rolling utilities
async function rollAbilityCheck(actor: dnd5e.documents.Actor5e, ability: string) {
  const roll = await dnd5e.dice.d20Roll({
    parts: [],
    data: actor.getRollData(),
    title: `${ability} Check`,
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: `${ability} Check`,
    fastForward: true
  });
  
  return roll;
}

// Example: Create a custom actor sheet
class MyCustomActorSheet extends dnd5e.applications.ActorSheet5eCharacter {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "sheet", "actor", "character", "my-custom-sheet"],
      width: 720,
      height: 680
    });
  }
  
  getData() {
    const data = super.getData();
    // Add custom data
    return data;
  }
}

// Register the custom sheet
Hooks.once("init", () => {
  Actors.registerSheet("dnd5e", MyCustomActorSheet, {
    types: ["character"],
    makeDefault: false,
    label: "My Custom Character Sheet"
  });
});
