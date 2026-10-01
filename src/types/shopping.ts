export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  addedById: string;
  /** ISO date. */
  addedOn: string;
  roomId?: string;
  completed: boolean;
}

export interface ShoppingConfig {
  all: string;
  tabsLabel: string;
  /** Chart-palette slot per category name; unknown categories fall back by position. */
  categoryColors: Record<string, number>;
  summaryTitle: string;
  /** "{done}/{total}" */
  summaryValue: string;
  summaryCaption: string;
  quickAdd: {
    label: string;
    name: string;
    namePlaceholder: string;
    quantity: string;
    quantityPlaceholder: string;
    category: string;
    submit: string;
    nameRequired: string;
  };
  clearBought: string;
  cleared: { one: string; other: string };
  addedBy: string;
  emptyAll: string;
  emptyAllHint: string;
  emptyCategory: string;
  allBought: string;
  added: string;
  addedActivity: string;
}
