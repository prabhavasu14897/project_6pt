import { Avatar } from './Avatar';

export interface AvatarGroupProps {
  people: { id: string; name: string; avatar?: string }[];
  max?: number;
  size?: number;
  label?: string;
}

export function AvatarGroup({ people, max = 4, size = 28, label }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="avatar-group" role="group" aria-label={label ?? people.map((p) => p.name).join(', ')}>
      {shown.map((p) => (
        <Avatar key={p.id} name={p.name} src={p.avatar} size={size} decorative />
      ))}
      {extra > 0 && (
        <span className="avatar avatar--extra" style={{ width: size, height: size }} aria-hidden="true">
          +{extra}
        </span>
      )}
    </span>
  );
}
