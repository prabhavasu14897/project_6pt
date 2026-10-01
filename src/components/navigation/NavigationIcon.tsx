import {
  AirVent,
  Bath,
  BatteryCharging,
  BedDouble,
  Bell,
  BookOpen,
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Droplets,
  Ellipsis,
  Flame,
  House,
  HousePlus,
  IndianRupee,
  MapPin,
  Plus,
  Refrigerator,
  Search,
  Settings,
  ShoppingCart,
  Sofa,
  SquareCheckBig,
  TriangleAlert,
  Users,
  Wallet,
  WashingMachine,
  Wrench,
  X,
  Zap,
  Tag,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/**
 * The icon vocabulary configuration may reference. Config values are typed against these keys,
 * so an unknown icon name fails the type-check instead of rendering nothing.
 */
const registry = {
  Home: House,
  House: HousePlus,
  CalendarDays,
  CheckSquare: SquareCheckBig,
  ShoppingCart,
  Wallet,
  Wrench,
  Users,
  Settings,
  Sofa,
  CookingPot,
  BedDouble,
  Bath,
  BookOpen,
  Car,
  IndianRupee,
  MapPin,
  Alert: TriangleAlert,
  Check,
  ChevronLeft,
  ChevronRight,
  Close: X,
  More: Ellipsis,
  Search,
  Bell,
  Plus,
  AirVent,
  Droplets,
  WashingMachine,
  Flame,
  Refrigerator,
  Battery: BatteryCharging,
  Zap,
  Tag,
  TrendingDown,
  TrendingUp,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

interface NavigationIconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function NavigationIcon({ name, size = 20, strokeWidth = 1.75, className }: NavigationIconProps) {
  const Icon = registry[name];
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" focusable="false" />;
}
