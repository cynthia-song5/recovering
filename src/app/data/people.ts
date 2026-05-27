export const PEOPLE = [
  { id: 'sarah', name: 'Sarah', initials: 'SC', bgColor: '#f5e6d3', textColor: '#8b6f47' },
  { id: 'james', name: 'James', initials: 'JM', bgColor: '#d4e8d4', textColor: '#4a7c59' },
  { id: 'nina',  name: 'Nina',  initials: 'NI', bgColor: '#d4e0ed', textColor: '#4a6b8a' },
] as const;

export type Person = (typeof PEOPLE)[number];
