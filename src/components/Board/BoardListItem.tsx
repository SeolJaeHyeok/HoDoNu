import styled from '@emotion/styled';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import CustomAvatarImage from '@components/CustomAvartar';
import { ArticleProps } from '@interfaces/article';
import { convertTime } from '@utils/func';

export default function BoardListItem(props: ArticleProps) {
  const { createdAt, articleId, title, hits, user, comments } = props;
  const boardName = 'free';

  const handleAuthorClick = () => {
    alert('TODO: 작성자 누르면 메세지 보내기 보여주기');
  };

  const handleBookmarkClick = () => {
    alert('TODO: 북마크 기능 ');
  };

  return (
    <ItemContainer>
      <ItemHeader>
        <CustomAvatarImage src={user.imgUrl} width={30} height={30} />
        <AuthorButton onClick={handleAuthorClick}>{user.nickname},</AuthorButton>
        <ItemCreatedTime>{convertTime(createdAt)}</ItemCreatedTime>
        <BookmarkBorderIcon className="bookmark-btn" onClick={handleBookmarkClick} />
      </ItemHeader>
      <ItemContent>
        <Link href={`/board/${boardName}/${articleId}`}>
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
        {hits}

        <ChatIcon
          sx={{
            fontSize: '16px',
            marginRight: '2px',
          }}
        />
        {comments}
      </ItemFooter>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 600px;
  border-bottom: 1px solid #f3f2f5;
  padding: 10px 0px;
  position: relative;
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
  cursor: pointer;
  color: #4c5662;
  &:hover {
    text-decoration: underline;
  }
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
