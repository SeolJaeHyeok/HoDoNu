const boardKeys = {
  all: ['detailContent'] as const,
  detail: (category: string, articleId: string) => [...boardKeys.all, category, articleId] as const,
};

export default boardKeys;
