import CustomAvatarImage from '@components/CustomAvartar';
import styled from '@emotion/styled';
import { ArticleProps } from '@interfaces/board';
import { convertTime } from '@utils/func';
import Link from 'next/link';

export default function MainBoardListItem({
  articleId,
  title,
  user,
  createdAt,
  id,
  category,
}: ArticleProps) {
  return (
    <ItemContainer>
      <ItemNumber>{id}</ItemNumber>
      <Link href={`/board/${category}/${articleId}`}>
        <ItemTitle>{title}</ItemTitle>
      </Link>
      <AuthorContainer>
        <CustomAvatarImage cursor={false} src={user.imgUrl} width={20} height={20} />
        <ItemAuthor>{user?.nickname}</ItemAuthor>
      </AuthorContainer>
      <ItemCreatedTime>{convertTime(createdAt!.toString())}</ItemCreatedTime>
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

const ItemTitle = styled.a`
  width: inherit;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }

  @media (max-width: 432px) {
    padding: 0;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const ItemAuthor = styled.button`
  width: 100px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  background-color: inherit;
`;

const ItemCreatedTime = styled.span`
  justify-items: end;
`;
