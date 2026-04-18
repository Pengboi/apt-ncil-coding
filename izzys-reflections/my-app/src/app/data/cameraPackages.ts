import { CameraBoothPackage } from '../types';

export const cameraBoothPackages: CameraBoothPackage[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    description: 'Perfect for small gatherings and intimate celebrations.',
    price: 299,
    duration: '2 hours',
    features: [
      '360° camera booth setup',
      'Fun props included',
      '50+ video captures',
      'Basic sharing station',
      'Setup and breakdown included',
      'Friendly attendant',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    description: 'Our most popular choice for weddings and parties.',
    price: 499,
    duration: '4 hours',
    features: [
      'Everything in Basic Package',
      '100+ video captures',
      'Custom branded overlay',
      'Premium props collection',
      'Extended sharing options',
      'Music selection',
      'Online gallery access',
    ],
    popular: true,
  },
  {
    id: 'deluxe',
    name: 'Deluxe Package',
    description: 'The ultimate experience for corporate events and grand celebrations.',
    price: 799,
    duration: '6 hours',
    features: [
      'Everything in Premium Package',
      'Unlimited video captures',
      'Custom music integration',
      'Professional event attendant',
      'USB drive with all videos',
      'Instant social media sharing',
      'Red carpet backdrop',
      'Priority booking',
    ],
  },
];

export const getCameraPackageById = (id: string): CameraBoothPackage | undefined => {
  return cameraBoothPackages.find((pkg) => pkg.id === id);
};
