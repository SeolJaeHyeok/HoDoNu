import BoardList from '@components/Board/BoardList';
import styled from '@emotion/styled';

const freeArticles = [
  {
    createdAt: '2021-10-22T07:57:43.146Z',
    articleId: 1,
    title: '안녕하세요dasdasdasdasdasdasdsadasdsa',
    hits: 0,
    user: {
      userId: '165f7945-b592-4271-b1e0-6df436ddc743',
      email: 'dohee@test.com',
      imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
      nickname: 'frozen_apricot_gamefowl',
    },
  },
  {
    createdAt: '2022-06-21T07:57:43.146Z',
    articleId: 2,
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
    createdAt: '2012-10-21T07:57:43.146Z',
    articleId: 545,
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
    createdAt: '2022-10-23T07:57:43.146Z',
    articleId: 32,
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
    createdAt: '2022-10-05T07:57:43.146Z',
    articleId: 132,
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

const doctorArticles = [
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 986,
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
    articleId: 1233,
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
    articleId: 6,
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
    articleId: 75,
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
    articleId: 91,
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

const nurseArticles = [
  {
    createdAt: '2022-10-21T07:57:43.146Z',
    articleId: 432,
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
    articleId: 3211,
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
    articleId: 109,
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
    articleId: 192,
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
    articleId: 183,
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

export default function Home() {
  return (
    <HomeContainer>
      <SliderContainer>Slider</SliderContainer>
      <BoardContainer>
        <BoardList type="main" articles={freeArticles} />
        <BoardList type="board" articles={doctorArticles} />
        <BoardList type="board" articles={nurseArticles} />
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
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 50px;
`;

// TODO - API 배포되면 요청을 통해 받아온 데이터로 변경
// function getServerSideProps() {
//     const {} =
// }
