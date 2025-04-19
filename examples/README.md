# DnD5e Types Examples

This directory contains examples of how to use the DnD5e types in your Foundry VTT modules.

## Basic Usage

The [basic-usage](./basic-usage) directory contains a simple example of how to use the DnD5e types to access actor and item data, use dice rolling utilities, and create a custom actor sheet.

## Custom Sheets

The [custom-sheets](./custom-sheets) directory contains a more complex example of how to create custom actor and item sheets with additional functionality.

## Running the Examples

These examples are meant to be used as reference code for your own Foundry VTT modules. They are not meant to be run directly.

To use these examples in your own module:

1. Install the DnD5e types package:
   ```bash
   npm install --save-dev foundryvtt-dnd5e-types
   ```

2. Configure your `tsconfig.json` to include the types:
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

3. Use the types in your code as shown in the examples.
