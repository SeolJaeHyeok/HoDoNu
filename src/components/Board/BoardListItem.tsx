import CustomAvatarImage from '@components/CustomAvartar';
import styled from '@emotion/styled';

export default function BoardListItem(props: any) {
  const { createdAt, articleId, title, hits, user, comments } = props.article;
  return (
    <ItemContainer>
      <ItemHeader>
        <CustomAvatarImage src={user.imgUrl} width={30} height={30} />
      </ItemHeader>
      <ItemContent></ItemContent>
      <ItemFooter></ItemFooter>
    </ItemContainer>
  );
}

const ItemContainer = styled.div``;

const ItemHeader = styled.div``;

const ItemContent = styled.div``;

const ItemFooter = styled.div``;
