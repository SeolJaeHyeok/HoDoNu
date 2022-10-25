import styled from '@emotion/styled';
import { convertTime } from '@utils/func';
import Link from 'next/link';
import { ArticleProps } from 'src/interfaces/article';

export default function BoardListItem(props: ArticleProps) {
  const { articleId, title, user, createdAt } = props;
  const boardName = 'free';

  return (
    <ItemContainer>
      <ItemNumber>{articleId}</ItemNumber>
      <Link href={`/${boardName}/${articleId}`}>
        <ItemTitle>{title}</ItemTitle>
      </Link>
      <ItemAuthor>{user.nickname}</ItemAuthor>
      <ItemCreatedTime>{convertTime(createdAt)}</ItemCreatedTime>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 100%;
  padding: 10px 0px;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  text-align: center;
`;

const ItemNumber = styled.span`
  font-weight: 600;
`;

const ItemTitle = styled.span`
  width: 150px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    text-decoration: underline;
  }
`;

const ItemAuthor = styled.span`
  width: 150px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemCreatedTime = styled.span`
  justify-items: end;
`;
