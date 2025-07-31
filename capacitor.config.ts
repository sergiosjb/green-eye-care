import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.2f10ee6652b440c8a1f9c9ca9a544398',
  appName: 'PlantVision',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://2f10ee66-52b4-40c8-a1f9-c9ca9a544398.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;