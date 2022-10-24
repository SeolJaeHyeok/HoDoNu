import BoardList from '@components/common/BoardList';
import styled from '@emotion/styled';

const freeArticles = [
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 8678686,
    title: '안녕하세요',
    hits: 0,
    user: {
      userId: '165f7945-b592-4271-b1e0-6df436ddc743',
      email: 'dohee@test.com',
      imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
      nickname: 'frozen_apricot_gamefowl',
    },
  },
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 856798707,
    title: '안녕하세요',
    hits: 0,
    user: {
      userId: '165f7945-b592-4271-b1e0-6df436ddc743',
      email: 'dohee@test.com',
      imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
      nickname: 'frozen_apricot_gamefowl',
    },
  },
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 746765978,
    title: '안녕하세요',
    hits: 0,
    user: {
      userId: '165f7945-b592-4271-b1e0-6df436ddc743',
      email: 'dohee@test.com',
      imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
      nickname: 'frozen_apricot_gamefowl',
    },
  },
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 64363769870,
    title: '안녕하세요',
    hits: 0,
    user: {
      userId: '165f7945-b592-4271-b1e0-6df436ddc743',
      email: 'dohee@test.com',
      imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
      nickname: 'frozen_apricot_gamefowl',
    },
  },
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 4262468769780,
    title: '안녕하세요',
    hits: 0,
    user: {
      userId: '165f7945-b592-4271-b1e0-6df436ddc743',
      email: 'dohee@test.com',
      imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
      nickname: 'frozen_apricot_gamefowl',
    },
  },
];

// const doctorArticles = [
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 12313534534,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 434324234,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 43242423,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 4324235246,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 6454564,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
// ];

// const nurseArticles = [
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 432,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 3211,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 432342,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 43243242,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
//   {
//     createdAt: '2022-10-21T07:57:43.146Z',
//     articleId: 53464564,
//     title: '안녕하세요',
//     hits: 0,
//     user: {
//       userId: '165f7945-b592-4271-b1e0-6df436ddc743',
//       email: 'dohee@test.com',
//       imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
//       nickname: 'frozen_apricot_gamefowl',
//     },
//   },
// ];

export default function Home() {
  return (
    <HomeContainer>
      <SliderContainer>Slider</SliderContainer>
      <BoardContainer>
        <BoardList type="main" articles={freeArticles} />
        <BoardItemContainer>자유 게시판</BoardItemContainer>
        <BoardItemContainer>의사 게시판</BoardItemContainer>
        <BoardItemContainer>간호사 게시판</BoardItemContainer>
      </BoardContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;

const SliderContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: grey;
  margin-bottom: 30px;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 50px;
  padding: 0 20px;
`;

const BoardItemContainer = styled.div`
  height: 500px;
  background-color: green;
`;

// TODO - API 배포되면 요청을 통해 받아온 데이터로 변경
// function getServerSideProps() {
//     const {} =
// }
