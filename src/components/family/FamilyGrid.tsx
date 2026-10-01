import { productConfig } from '@/config';
import type { HouseholdState } from '@/data/prototype';
import { FamilyMemberCard } from './FamilyMemberCard';

export interface FamilyGridProps {
  household: HouseholdState;
  selectedId: string;
  onSelect: (memberId: string) => void;
}

export function FamilyGrid({ household, selectedId, onSelect }: FamilyGridProps) {
  const { family, familyScreen: copy } = productConfig;
  return (
    <ul className="family-grid" aria-label={copy.membersLabel}>
      {family.map((member) => (
        <li key={member.id}>
          <FamilyMemberCard member={member} household={household} selected={member.id === selectedId} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
