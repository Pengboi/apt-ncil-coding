'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <i className={`fas fa-${name} ${className || ''}`} />
);

export const IconBrand: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <i className={`fab fa-${name} ${className || ''}`} />
);

// Specific icons used throughout the site
export const FootballIcon = ({ className }: IconProps) => <Icon name="futbol" className={className} />;
export const StarIcon = ({ className }: IconProps) => <Icon name="star" className={className} />;
export const PlayIcon = ({ className }: IconProps) => <Icon name="play-circle" className={className} />;
export const ShoppingIcon = ({ className }: IconProps) => <Icon name="shopping-bag" className={className} />;
export const DumbbellIcon = ({ className }: IconProps) => <Icon name="dumbbell" className={className} />;
export const RunningIcon = ({ className }: IconProps) => <Icon name="running" className={className} />;
export const BullseyeIcon = ({ className }: IconProps) => <Icon name="bullseye" className={className} />;
export const StopwatchIcon = ({ className }: IconProps) => <Icon name="stopwatch" className={className} />;
export const HandPaperIcon = ({ className }: IconProps) => <Icon name="hand-paper" className={className} />;
export const ShieldIcon = ({ className }: IconProps) => <Icon name="shield-alt" className={className} />;
export const FistIcon = ({ className }: IconProps) => <Icon name="fist-raised" className={className} />;
export const CheckIcon = ({ className }: IconProps) => <Icon name="check" className={className} />;
export const HeartbeatIcon = ({ className }: IconProps) => <Icon name="heartbeat" className={className} />;
export const CarrotIcon = ({ className }: IconProps) => <Icon name="carrot" className={className} />;
export const UtensilsIcon = ({ className }: IconProps) => <Icon name="utensils" className={className} />;
export const ClockIcon = ({ className }: IconProps) => <Icon name="clock" className={className} />;
export const BoltIcon = ({ className }: IconProps) => <Icon name="bolt" className={className} />;
export const RecycleIcon = ({ className }: IconProps) => <Icon name="recycle" className={className} />;
export const TintIcon = ({ className }: IconProps) => <Icon name="tint" className={className} />;
export const GlassWaterIcon = ({ className }: IconProps) => <Icon name="glass-water" className={className} />;
export const BedIcon = ({ className }: IconProps) => <Icon name="bed" className={className} />;
export const MoonIcon = ({ className }: IconProps) => <Icon name="moon" className={className} />;
export const CheckCircleIcon = ({ className }: IconProps) => <Icon name="check-circle" className={className} />;
export const BrainIcon = ({ className }: IconProps) => <Icon name="brain" className={className} />;
export const SpaIcon = ({ className }: IconProps) => <Icon name="spa" className={className} />;
export const LungsIcon = ({ className }: IconProps) => <Icon name="lungs" className={className} />;
export const EyeIcon = ({ className }: IconProps) => <Icon name="eye" className={className} />;
export const CommentsIcon = ({ className }: IconProps) => <Icon name="comments" className={className} />;
export const TargetIcon = ({ className }: IconProps) => <Icon name="bullseye" className={className} />;
export const ShoppingCartIcon = ({ className }: IconProps) => <Icon name="shopping-cart" className={className} />;
export const ThLargeIcon = ({ className }: IconProps) => <Icon name="th-large" className={className} />;
export const ShoePrintsIcon = ({ className }: IconProps) => <Icon name="shoe-prints" className={className} />;
export const TshirtIcon = ({ className }: IconProps) => <Icon name="tshirt" className={className} />;
export const BallIcon = ({ className }: IconProps) => <Icon name="futbol" className={className} />;
export const StarHalfIcon = ({ className }: IconProps) => <Icon name="star-half-alt" className={className} />;
export const ExternalLinkIcon = ({ className }: IconProps) => <Icon name="external-link-alt" className={className} />;
export const PlaneIcon = ({ className }: IconProps) => <Icon name="paper-plane" className={className} />;
export const SpinnerIcon = ({ className }: IconProps) => <Icon name="spinner" className={className} />;
export const EnvelopeIcon = ({ className }: IconProps) => <Icon name="envelope" className={className} />;
export const MapMarkerIcon = ({ className }: IconProps) => <Icon name="map-marker-alt" className={className} />;
export const HeartIcon = ({ className }: IconProps) => <Icon name="heart" className={className} />;
export const ChevronDownIcon = ({ className }: IconProps) => <Icon name="chevron-down" className={className} />;
export const BarsIcon = ({ className }: IconProps) => <Icon name="bars" className={className} />;
export const TimesIcon = ({ className }: IconProps) => <Icon name="times" className={className} />;
export const BottleWaterIcon = ({ className }: IconProps) => <Icon name="bottle-water" className={className} />;
export const InfoCircleIcon = ({ className }: IconProps) => <Icon name="info-circle" className={className} />;

// Brand icons
export const InstagramIcon = ({ className }: IconProps) => <IconBrand name="instagram" className={className} />;
export const TwitterIcon = ({ className }: IconProps) => <IconBrand name="twitter" className={className} />;
export const YoutubeIcon = ({ className }: IconProps) => <IconBrand name="youtube" className={className} />;
export const TiktokIcon = ({ className }: IconProps) => <IconBrand name="tiktok" className={className} />;
