import { Camera as ICamera, Vector2 } from '../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, CAMERA_SMOOTHNESS, CAMERA_DEADZONE_X, CAMERA_DEADZONE_Y } from '../constants';

export class Camera implements ICamera {
  x: number;
  y: number;
  width: number;
  height: number;
  targetX: number;
  targetY: number;
  smoothness: number;
  
  // World bounds (optional - to prevent showing outside world)
  private worldWidth: number;
  private worldHeight: number;
  private hasWorldBounds: boolean;
  
  constructor(worldWidth?: number, worldHeight?: number) {
    this.x = 0;
    this.y = 0;
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
    this.targetX = 0;
    this.targetY = 0;
    this.smoothness = CAMERA_SMOOTHNESS;
    
    this.worldWidth = worldWidth || 0;
    this.worldHeight = worldHeight || 0;
    this.hasWorldBounds = !!(worldWidth && worldHeight);
  }
  
  // ----------------------------------------------------------
  // Update camera to follow target
  // ----------------------------------------------------------
  follow(targetX: number, targetY: number, targetWidth: number, targetHeight: number): void {
    // Calculate target center
    const targetCenterX = targetX + targetWidth / 2;
    const targetCenterY = targetY + targetHeight / 2;
    
    // Desired camera position (centered on target)
    const desiredX = targetCenterX - this.width / 2;
    const desiredY = targetCenterY - this.height / 2;
    
    // Apply deadzone - only move if target moves outside deadzone
    const dx = desiredX - this.x;
    const dy = desiredY - this.y;
    
    // Check if we need to update target position (outside deadzone)
    if (Math.abs(dx) > CAMERA_DEADZONE_X) {
      this.targetX = desiredX - Math.sign(dx) * CAMERA_DEADZONE_X;
    }
    if (Math.abs(dy) > CAMERA_DEADZONE_Y) {
      this.targetY = desiredY - Math.sign(dy) * CAMERA_DEADZONE_Y;
    }
    
    // Smoothly interpolate current position to target
    this.x += (this.targetX - this.x) * this.smoothness;
    this.y += (this.targetY - this.y) * this.smoothness;
    
    // Clamp to world bounds if set
    if (this.hasWorldBounds) {
      this.clampToBounds();
    }
  }
  
  // ----------------------------------------------------------
  // Instant position set (no smoothing)
  // ----------------------------------------------------------
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    
    if (this.hasWorldBounds) {
      this.clampToBounds();
    }
  }
  
  // ----------------------------------------------------------
  // Center on position immediately
  // ----------------------------------------------------------
  centerOn(targetX: number, targetY: number, targetWidth: number, targetHeight: number): void {
    const centerX = targetX + targetWidth / 2 - this.width / 2;
    const centerY = targetY + targetHeight / 2 - this.height / 2;
    this.setPosition(centerX, centerY);
  }
  
  // ----------------------------------------------------------
  // Keep camera within world bounds
  // ----------------------------------------------------------
  private clampToBounds(): void {
    // Don't show beyond left edge
    if (this.x < 0) {
      this.x = 0;
      this.targetX = 0;
    }
    
    // Don't show beyond top edge
    if (this.y < 0) {
      this.y = 0;
      this.targetY = 0;
    }
    
    // Don't show beyond right edge
    if (this.worldWidth > 0) {
      const maxX = this.worldWidth - this.width;
      if (this.x > maxX) {
        this.x = maxX;
        this.targetX = maxX;
      }
    }
    
    // Don't show beyond bottom edge
    if (this.worldHeight > 0) {
      const maxY = this.worldHeight - this.height;
      if (this.y > maxY) {
        this.y = maxY;
        this.targetY = maxY;
      }
    }
  }
  
  // ----------------------------------------------------------
  // Update world bounds
  // ----------------------------------------------------------
  setWorldBounds(width: number, height: number): void {
    this.worldWidth = width;
    this.worldHeight = height;
    this.hasWorldBounds = true;
    this.clampToBounds();
  }
  
  // ----------------------------------------------------------
  // Coordinate conversion
  // ----------------------------------------------------------
  worldToScreen(worldX: number, worldY: number): { x: number; y: number } {
    return {
      x: worldX - this.x,
      y: worldY - this.y,
    };
  }
  
  screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
    return {
      x: screenX + this.x,
      y: screenY + this.y,
    };
  }
  
  // ----------------------------------------------------------
  // Visibility check (for culling)
  // ----------------------------------------------------------
  isVisible(worldX: number, worldY: number, width: number, height: number): boolean {
    return (
      worldX + width >= this.x &&
      worldX <= this.x + this.width &&
      worldY + height >= this.y &&
      worldY <= this.y + this.height
    );
  }
  
  // ----------------------------------------------------------
  // Get visible bounds
  // ----------------------------------------------------------
  getVisibleBounds(): { left: number; right: number; top: number; bottom: number } {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height,
    };
  }
  
  // ----------------------------------------------------------
  // Shake effect
  // ----------------------------------------------------------
  shake(intensity: number, duration: number): void {
    // Simple shake - could be expanded with proper shake system
    const shakeX = (Math.random() - 0.5) * intensity;
    const shakeY = (Math.random() - 0.5) * intensity;
    this.x += shakeX;
    this.y += shakeY;
  }
}
