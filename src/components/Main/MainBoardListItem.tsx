import CustomAvatarImage from '@components/CustomAvartar';
import styled from '@emotion/styled';
import { convertTime } from '@utils/func';
import Link from 'next/link';
import { ArticleProps } from 'src/interfaces/article';

export default function BoardListItem(props: ArticleProps) {
  const { articleId, title, user, createdAt, id } = props;
  const boardName = 'free';

  const handleAvartarClick = () => {
    alert('메인페이지에서 게시판 안에 있는 프로필 이미지 클릭 시 발생시킬 함수');
  };

  const handleAuthorClick = () => {
    alert('메인페이지에서 작성자 이름을 클릭했을 때 발생시킬 함수');
  };

  return (
    <ItemContainer>
      <ItemNumber>{id}</ItemNumber>
      <Link href={`/${boardName}/${articleId}`}>
        <ItemTitle>{title}</ItemTitle>
      </Link>
      <AuthorContainer>
        <CustomAvatarImage handleClick={handleAvartarClick} width={20} height={20} />
        <ItemAuthor onClick={handleAuthorClick}>{user.nickname}</ItemAuthor>
      </AuthorContainer>
      <ItemCreatedTime>{convertTime(createdAt.toString())}</ItemCreatedTime>
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
  width: 150px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ItemAuthor = styled.button`
  width: 150px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  background-color: inherit;

  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const ItemCreatedTime = styled.span`
  justify-items: end;
`;
