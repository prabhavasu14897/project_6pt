import { cn } from '@/lib/utils';
import { Card, type CardProps } from './Card';

/** A card that floats over imagery (the scene, sheets): translucent surface with a backdrop blur. */
export function GlassCard({ className, ...rest }: CardProps) {
  return <Card className={cn('card--glass', className)} {...rest} />;
}
