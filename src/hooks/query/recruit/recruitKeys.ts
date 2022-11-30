const recruitKeys = {
  all: ['recruitList'] as const,
  list: (paths: string) => [...recruitKeys.all, paths] as const,
};

export default recruitKeys;
