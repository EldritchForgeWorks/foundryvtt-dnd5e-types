/**
 * Data types for DnD5e tokens
 */

/**
 * The token data
 */
export interface TokenData {
  /**
   * The token's name
   */
  name: string;

  /**
   * The token's display name
   */
  displayName: number;

  /**
   * The token's actor ID
   */
  actorId: string;

  /**
   * The token's actor link
   */
  actorLink: boolean;

  /**
   * The token's actor data
   */
  actorData: Record<string, unknown>;

  /**
   * The token's width
   */
  width: number;

  /**
   * The token's height
   */
  height: number;

  /**
   * The token's scale
   */
  scale: number;

  /**
   * The token's image
   */
  img: string;

  /**
   * The token's tint
   */
  tint: string;

  /**
   * The token's alpha
   */
  alpha: number;

  /**
   * The token's lockRotation
   */
  lockRotation: boolean;

  /**
   * The token's rotation
   */
  rotation: number;

  /**
   * The token's disposition
   */
  disposition: number;

  /**
   * The token's display bars
   */
  displayBars: number;

  /**
   * The token's bar1
   */
  bar1: {
    /**
     * The token's bar1 attribute
     */
    attribute: string;
  };

  /**
   * The token's bar2
   */
  bar2: {
    /**
     * The token's bar2 attribute
     */
    attribute: string;
  };

  /**
   * The token's light
   */
  light: {
    /**
     * The token's light alpha
     */
    alpha: number;

    /**
     * The token's light angle
     */
    angle: number;

    /**
     * The token's light bright
     */
    bright: number;

    /**
     * The token's light color
     */
    color: string;

    /**
     * The token's light coloration
     */
    coloration: number;

    /**
     * The token's light dim
     */
    dim: number;

    /**
     * The token's light gradual
     */
    gradual: boolean;

    /**
     * The token's light luminosity
     */
    luminosity: number;

    /**
     * The token's light saturation
     */
    saturation: number;

    /**
     * The token's light contrast
     */
    contrast: number;

    /**
     * The token's light shadows
     */
    shadows: number;

    /**
     * The token's light animation
     */
    animation: {
      /**
       * The token's light animation type
       */
      type: string;

      /**
       * The token's light animation speed
       */
      speed: number;

      /**
       * The token's light animation intensity
       */
      intensity: number;

      /**
       * The token's light animation reverse
       */
      reverse: boolean;
    };
  };

  /**
   * The token's sight
   */
  sight: {
    /**
     * The token's sight angle
     */
    angle: number;

    /**
     * The token's sight enabled
     */
    enabled: boolean;

    /**
     * The token's sight range
     */
    range: number;

    /**
     * The token's sight brightness
     */
    brightness: number;

    /**
     * The token's sight visionMode
     */
    visionMode: string;
  };

  /**
   * The token's detectionModes
   */
  detectionModes: Array<{
    /**
     * The detection mode's id
     */
    id: string;

    /**
     * The detection mode's enabled
     */
    enabled: boolean;

    /**
     * The detection mode's range
     */
    range: number;
  }>;

  /**
   * The token's flags
   */
  flags: Record<string, unknown>;

  /**
   * The token's texture
   */
  texture: {
    /**
     * The token's texture src
     */
    src: string;

    /**
     * The token's texture scaleX
     */
    scaleX: number;

    /**
     * The token's texture scaleY
     */
    scaleY: number;

    /**
     * The token's texture offsetX
     */
    offsetX: number;

    /**
     * The token's texture offsetY
     */
    offsetY: number;

    /**
     * The token's texture rotation
     */
    rotation: number;

    /**
     * The token's texture tint
     */
    tint: string;
  };
}
