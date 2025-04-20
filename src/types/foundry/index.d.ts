/**
 * Re-exports of Foundry VTT types to ensure proper inheritance
 */

// Import the Foundry VTT types package to ensure the global types are available
import '@league-of-foundry-developers/foundry-vtt-types';

// Re-export the global types

// Game
export type Game = globalThis.Game;

// Re-export the DnD5eGame interface
export { DnD5eGame } from '../game';

// Applications
export type Application = globalThis.Application;
export type ActorSheet = globalThis.ActorSheet;
export type ItemSheet = globalThis.ItemSheet;

// Documents
export type Actor = globalThis.Actor;
export type Item = globalThis.Item;
export type Token = globalThis.Token;
export type ChatMessage = globalThis.ChatMessage;
export type Combat = globalThis.Combat;
export type Combatant = globalThis.Combatant;
export type ActiveEffect = globalThis.ActiveEffect;
export type JournalEntryPage = globalThis.JournalEntryPage;

// Data types - use our own data types instead of the global ones
export { ActorData } from '../data/actor';
export { ItemData } from '../data/item';
// Use our own TokenData type
export { TokenData } from '../data/token';
