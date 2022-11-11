export const categoryAssertion = {
  DOCTOR: 'Doctor',
  FREE: 'Free',
  NURSE: 'Nurse',
} as const;

export const CATEGORY_TABLE: {
  [index: string]: string;
} = {
  Free: '자유',
  Nurse: '간호사',
  Doctor: '의사',
} as const;

export const articleAuthList: readonly string[] = ['Free', 'Doctor', 'Nurse'];
