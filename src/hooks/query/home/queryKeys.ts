const queryKeys = {
  all: ['main', 'board'] as const,
  detail: (category: string) => [...queryKeys.all, category] as const,
};

export default queryKeys;
