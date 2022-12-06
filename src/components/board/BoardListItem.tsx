import styled from '@emotion/styled';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import CustomAvatarImage from '@components/CustomAvartar';

import { convertTime } from '@utils/func';
import { ArticleProps } from '@interfaces/board';

interface BoardListItemProps extends ArticleProps {
  boardCategory: string;
}

export default function BoardListItem(props: BoardListItemProps) {
  const { createdAt, articleId, title, hits, user, comments, boardCategory } = props;

  return (
    <ItemContainer>
      <ItemHeader>
        <CustomAvatarImage src={user?.imgUrl} width={30} height={30} />
        <AuthorButton>{user?.nickname},</AuthorButton>
        <ItemCreatedTime>{convertTime(createdAt!.toString())}</ItemCreatedTime>
        <BookmarkBorderIcon className="bookmark-btn" />
      </ItemHeader>
      <ItemContent>
        <Link href={`/board/${boardCategory}/${articleId}`}>
          <ItemTitle>{title}</ItemTitle>
        </Link>
      </ItemContent>
      <ItemFooter>
        <RemoveRedEyeIcon
          sx={{
            fontSize: '16px',
            marginRight: '2px',
          }}
        />
        {hits?.toLocaleString()}회
        <ChatIcon
          sx={{
            fontSize: '16px',
            marginRight: '2px',
          }}
        />
        {comments?.toLocaleString()}개
      </ItemFooter>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 850px;
  border-bottom: 1px solid #f3f2f5;
  padding: 10px 0px;
  position: relative;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 320px;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;

  .bookmark-btn {
    position: absolute;
    top: 10%;
    right: 0;
    cursor: pointer;
  }
`;

const AuthorButton = styled.button`
  border: none;
  background-color: inherit;
  color: #4c5662;
`;

const ItemCreatedTime = styled.span`
  color: #4c5662;
`;

const ItemContent = styled.div`
  margin-bottom: 20px;
`;

const ItemTitle = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const ItemFooter = styled.div`
  position: absolute;
  bottom: 10%;
  right: 0;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 10px;
  }
`;
