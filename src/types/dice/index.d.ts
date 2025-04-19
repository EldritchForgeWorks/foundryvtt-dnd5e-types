/**
 * Dice rolling utilities for the DnD5e system
 */

/**
 * Roll a d20 with advantage or disadvantage
 */
export declare function d20Roll(options?: {
  /**
   * The parts of the roll
   */
  parts?: string[];
  
  /**
   * The data to use for the roll
   */
  data?: Record<string, unknown>;
  
  /**
   * Whether the roll has advantage
   */
  advantage?: boolean;
  
  /**
   * Whether the roll has disadvantage
   */
  disadvantage?: boolean;
  
  /**
   * The critical threshold
   */
  critical?: number;
  
  /**
   * The fumble threshold
   */
  fumble?: number;
  
  /**
   * The target DC
   */
  targetValue?: number;
  
  /**
   * Whether to use elven accuracy
   */
  elvenAccuracy?: boolean;
  
  /**
   * Whether to use reliable talent
   */
  reliableTalent?: boolean;
  
  /**
   * The roll mode
   */
  rollMode?: string;
  
  /**
   * The roll flavor
   */
  flavor?: string;
  
  /**
   * The speaker
   */
  speaker?: {
    /**
     * The speaker's token
     */
    token?: TokenDocument;
    
    /**
     * The speaker's actor
     */
    actor?: Actor;
    
    /**
     * The speaker's alias
     */
    alias?: string;
  };
  
  /**
   * The roll event
   */
  event?: Event;
  
  /**
   * The roll template
   */
  template?: string;
  
  /**
   * The roll title
   */
  title?: string;
  
  /**
   * The roll message data
   */
  messageData?: Record<string, unknown>;
  
  /**
   * The roll options
   */
  options?: Record<string, unknown>;
  
  /**
   * The roll dialog options
   */
  dialogOptions?: Record<string, unknown>;
  
  /**
   * Whether to fast forward the roll
   */
  fastForward?: boolean;
}): Promise<Roll>;

/**
 * Roll damage
 */
export declare function damageRoll(options?: {
  /**
   * The parts of the roll
   */
  parts?: string[];
  
  /**
   * The data to use for the roll
   */
  data?: Record<string, unknown>;
  
  /**
   * Whether the roll is critical
   */
  critical?: boolean;
  
  /**
   * The roll mode
   */
  rollMode?: string;
  
  /**
   * The roll flavor
   */
  flavor?: string;
  
  /**
   * The speaker
   */
  speaker?: {
    /**
     * The speaker's token
     */
    token?: TokenDocument;
    
    /**
     * The speaker's actor
     */
    actor?: Actor;
    
    /**
     * The speaker's alias
     */
    alias?: string;
  };
  
  /**
   * The roll event
   */
  event?: Event;
  
  /**
   * The roll template
   */
  template?: string;
  
  /**
   * The roll title
   */
  title?: string;
  
  /**
   * The roll message data
   */
  messageData?: Record<string, unknown>;
  
  /**
   * The roll options
   */
  options?: Record<string, unknown>;
  
  /**
   * The roll dialog options
   */
  dialogOptions?: Record<string, unknown>;
  
  /**
   * Whether to fast forward the roll
   */
  fastForward?: boolean;
}): Promise<Roll>;

/**
 * Roll a hit die
 */
export declare function hitDieRoll(options?: {
  /**
   * The formula to roll
   */
  formula?: string;
  
  /**
   * The data to use for the roll
   */
  data?: Record<string, unknown>;
  
  /**
   * The roll mode
   */
  rollMode?: string;
  
  /**
   * The roll flavor
   */
  flavor?: string;
  
  /**
   * The speaker
   */
  speaker?: {
    /**
     * The speaker's token
     */
    token?: TokenDocument;
    
    /**
     * The speaker's actor
     */
    actor?: Actor;
    
    /**
     * The speaker's alias
     */
    alias?: string;
  };
  
  /**
   * The roll event
   */
  event?: Event;
  
  /**
   * The roll template
   */
  template?: string;
  
  /**
   * The roll title
   */
  title?: string;
  
  /**
   * The roll message data
   */
  messageData?: Record<string, unknown>;
  
  /**
   * The roll options
   */
  options?: Record<string, unknown>;
  
  /**
   * The roll dialog options
   */
  dialogOptions?: Record<string, unknown>;
  
  /**
   * Whether to fast forward the roll
   */
  fastForward?: boolean;
}): Promise<Roll>;
