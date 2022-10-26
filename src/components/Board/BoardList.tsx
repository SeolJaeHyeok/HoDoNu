import BoardListItem from './BoardListItem';

// any -> 다른 브랜치에서 만든 ArticleProps로 변경
export default function BoardList({ articles }: any) {
  return (
    <>
      {articles.map((article: any) => (
        <BoardListItem key={article.articleId} article={article} />
      ))}
    </>
  );
}
