# Foundry VTT DnD5e Types

Comprehensive TypeScript type definitions for the DnD5e system in Foundry VTT.

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/EldritchForgeWorks/foundryvtt-dnd5e-types/update-types.yml?label=DnD5e%20Types%20Update)](https://github.com/EldritchForgeWorks/foundryvtt-dnd5e-types/actions/workflows/update-types.yml)
[![npm version](https://img.shields.io/npm/v/foundryvtt-dnd5e-types)](https://www.npmjs.com/package/foundryvtt-dnd5e-types)
[![npm downloads](https://img.shields.io/npm/dt/foundryvtt-dnd5e-types)](https://www.npmjs.com/package/foundryvtt-dnd5e-types)

## Description

This package provides comprehensive TypeScript type definitions for the DnD5e system in Foundry VTT. It is designed to be used alongside the [@league-of-foundry-developers/foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types) package, which provides type definitions for the core Foundry VTT API.

The type definitions are automatically generated and updated from the official DnD5e system code, ensuring they stay in sync with the latest features and changes.

**Compatible with DnD5e version 4.3.9**

## Documentation

Detailed API documentation is available at [https://yourusername.github.io/foundryvtt-dnd5e-types/](https://yourusername.github.io/foundryvtt-dnd5e-types/)

The documentation is versioned, so you can access documentation for specific versions:
- Latest: [https://yourusername.github.io/foundryvtt-dnd5e-types/latest/](https://yourusername.github.io/foundryvtt-dnd5e-types/latest/)
- Specific version: [https://yourusername.github.io/foundryvtt-dnd5e-types/v1.0.0/](https://yourusername.github.io/foundryvtt-dnd5e-types/v1.0.0/)

## Installation

### Requirements

- Node.js v23.11.0 or compatible (see `.nvmrc`)
- TypeScript 5.8.3 or later

### npm

```bash
npm install --save-dev foundryvtt-dnd5e-types
```

### yarn

```bash
yarn add --dev foundryvtt-dnd5e-types
```

### pnpm

```bash
pnpm add --save-dev foundryvtt-dnd5e-types
```

## Usage

Add the package to your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "types": [
      "@league-of-foundry-developers/foundry-vtt-types",
      "foundryvtt-dnd5e-types"
    ]
  }
}
```

Then you can use the types in your TypeScript code:

```typescript
// Example: Access a DnD5e actor
const actor = game.actors.get("actor-id") as Game["actors"]["get"] & dnd5e.documents.Actor5e;
console.log(actor.system.attributes.ac.value);

// Example: Access a DnD5e item
const item = actor.items.get("item-id") as dnd5e.documents.Item5e;
console.log(item.system.damage.parts);

// Example: Create a new DnD5e actor sheet
class MyCustomActorSheet extends dnd5e.applications.ActorSheet5eCharacter {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "sheet", "actor", "character", "my-custom-sheet"],
      width: 720,
      height: 680
    });
  }
}

// Example: Use DnD5e utility functions
const abilityMod = dnd5e.utils.calculateAbilityModifier(14); // Returns 2
```

## Structure

The type definitions are organized into the following namespaces:

### `dnd5e.documents`

Document classes for the DnD5e system:

- `Actor5e`: The base actor class for DnD5e actors
- `Item5e`: The base item class for DnD5e items
- `Token5e`: The token class for DnD5e tokens
- `ActiveEffect5e`: The active effect class for DnD5e effects
- `ChatMessage5e`: The chat message class for DnD5e messages
- `Combat5e`: The combat class for DnD5e combats
- `Combatant5e`: The combatant class for DnD5e combatants
- `JournalEntryPage5e`: The journal entry page class for DnD5e journal entries

### `dnd5e.data`

Data models for the DnD5e system:

- `ActorData`: Data models for DnD5e actors (CharacterData, NPCData, VehicleData)
- `ItemData`: Data models for DnD5e items (WeaponData, SpellData, etc.)

### `dnd5e.applications`

Application classes for the DnD5e system:

- `ActorSheet5e`: The base actor sheet class for DnD5e actors
- `ActorSheet5eCharacter`: The character actor sheet class
- `ActorSheet5eNPC`: The NPC actor sheet class
- `ActorSheet5eVehicle`: The vehicle actor sheet class
- `ItemSheet5e`: The base item sheet class for DnD5e items
- `Dialog5e`: The dialog class for DnD5e dialogs

### `dnd5e.config`

Configuration data for the DnD5e system:

- `DND5EConfig`: The configuration object for the DnD5e system

### `dnd5e.dice`

Dice rolling utilities for the DnD5e system:

- `d20Roll`: Roll a d20 with advantage/disadvantage
- `damageRoll`: Roll damage
- `hitDieRoll`: Roll hit dice

### `dnd5e.utils`

Utility functions for the DnD5e system:

- `calculateAbilityModifier`: Calculate ability modifiers
- `calculateProficiencyBonus`: Calculate proficiency bonus
- And many more utility functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Use the correct Node.js version: `nvm use` (requires [nvm](https://github.com/nvm-sh/nvm))
3. Install dependencies: `npm install`
4. Build the project: `npm run build`

### Code Quality Tools

This project uses several tools to ensure code quality:

- **ESLint**: Lints TypeScript code
  - Run: `npm run lint`
  - Fix issues: `npm run lint:fix`

- **Prettier**: Formats code consistently
  - Run: `npm run format`
  - Check formatting: `npm run format:check`

- **TypeDoc**: Generates API documentation
  - Run: `npm run docs`
  - Output: `docs/` directory
  - Versioned docs: Published automatically with each release to GitHub Pages

### Adding New Types

If you want to add new types or improve existing ones:

1. Find the appropriate file in the `src/types` directory
2. Add or update the type definitions
3. Build the project to ensure there are no errors: `npm run build`
4. Submit a pull request using conventional commit messages

### Commit Message Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This helps with automatic versioning and changelog generation. Examples:

- `feat: add types for ActorSheet5eCharacter` - for new features (minor version bump)
- `fix: correct return type of getData method` - for bug fixes (patch version bump)
- `docs: update usage examples` - for documentation changes (no version bump)
- `chore: update dependencies` - for maintenance tasks (no version bump)
- `feat!: rename method to follow new convention` - for breaking changes (major version bump)

### Release Process

This project uses [Release Please](https://github.com/googleapis/release-please) for automated releases:

1. Commits to the main branch are automatically analyzed
2. Release Please creates or updates a release PR that:
   - Updates the version in package.json based on conventional commits
   - Updates the CHANGELOG.md with all changes
3. When the release PR is merged, Release Please:
   - Creates a GitHub release
   - Tags the release
   - Publishes the package to npm

### Automated Updates

This package includes a GitHub Action that automatically checks for new versions of the DnD5e system and updates the type definitions accordingly. The action runs daily and creates a pull request when a new version is detected.

You can also manually trigger the action from the Actions tab in the GitHub repository.

#### How it works

1. The action checks the latest version of the DnD5e system from the official repository
2. If a new version is detected, it downloads the source code
3. It analyzes the source code to identify classes, methods, properties, etc.
4. It extracts JSDoc comments and infers types from the code
5. It updates the type definitions based on the analysis
6. It creates a pull request with the changes

#### Manual Update Process

You can also run the update process manually:

```bash
# Download the latest DnD5e system
npm run download-dnd5e

# Analyze the DnD5e system
npm run analyze

# Update the type definitions
npm run update-types

# Fix any declaration issues
npm run fix-declarations

# Or run the entire process at once
npm run check-dnd5e
```

The automated updates help keep the type definitions in sync with the latest version of the DnD5e system, but manual review is still required to ensure accuracy.

## Advanced Usage

### Working with Actor Data

The DnD5e system uses a complex data structure for actors. Here's how to work with it:

```typescript
// Access character data
const character = game.actors.get("character-id") as Game["actors"]["get"] & dnd5e.documents.Actor5e;
const characterData = character.system as dnd5e.data.CharacterData;

// Access ability scores
const strength = characterData.abilities.str.value;
const dexterity = characterData.abilities.dex.value;

// Access skills
const acrobatics = characterData.skills.acr.total;
const perception = characterData.skills.prc.passive;
```

### Working with Item Data

Similarly, items have different data structures based on their type:

```typescript
// Access weapon data
const weapon = actor.items.get("weapon-id") as dnd5e.documents.Item5e;
const weaponData = weapon.system as dnd5e.data.WeaponData;

// Access spell data
const spell = actor.items.get("spell-id") as dnd5e.documents.Item5e;
const spellData = spell.system as dnd5e.data.SpellData;
```

### Extending DnD5e Classes

You can extend the DnD5e classes to create your own custom functionality:

```typescript
class MyCustomActor extends dnd5e.documents.Actor5e {
  // Add custom methods
  calculateCustomStat() {
    return this.system.abilities.str.value + this.system.abilities.con.value;
  }
}

class MyCustomSheet extends dnd5e.applications.ActorSheet5eCharacter {
  // Override methods
  getData() {
    const data = super.getData();
    // Add custom data
    data.customData = "Custom value";
    return data;
  }
}
```

## Troubleshooting

### Type Errors

If you encounter type errors, make sure you're using the correct type assertions:

```typescript
// Incorrect
const actor = game.actors.get("actor-id"); // Type is Actor

// Correct
const actor = game.actors.get("actor-id") as Game["actors"]["get"] & dnd5e.documents.Actor5e;
```

### Missing Properties

If you encounter missing properties, it might be because:

1. The property is new in a version of DnD5e that's not yet supported
2. The property is custom added by a module
3. The property is internal and not exposed in the type definitions

You can use type assertions to work around these issues:

```typescript
// Access a property that's not in the type definitions
const customValue = (actor.system as any).customProperty;
```

## Versioning and Compatibility

### Version Scheme

This package follows [Semantic Versioning](https://semver.org/):

- **Major version** (x.0.0): Breaking changes that require updates to your code
- **Minor version** (0.x.0): New features or types added in a backward-compatible manner
- **Patch version** (0.0.x): Bug fixes and minor improvements

### Automated Versioning

The package version is automatically updated using [Release Please](https://github.com/googleapis/release-please) based on [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` commits trigger a minor version bump
- `fix:` commits trigger a patch version bump
- `feat!:` or `fix!:` commits trigger a major version bump

### DnD5e Compatibility

Each release of this package is compatible with a specific version of the DnD5e system. The compatible DnD5e version is noted:

- In the README (see the badge at the top)
- In the package description on npm
- In the GitHub release notes
- In the `version.json` file in the repository

When a new version of DnD5e is released, this package will be automatically updated to support it, typically within a few days. These updates are made with `feat:` commits, which trigger a minor version bump.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Foundry VTT](https://foundryvtt.com/)
- [League of Extraordinary Foundry VTT Developers](https://github.com/League-of-Foundry-Developers)
- [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types)
- [DnD5e System](https://github.com/foundryvtt/dnd5e)
- [Release Please](https://github.com/googleapis/release-please) for automated releases
