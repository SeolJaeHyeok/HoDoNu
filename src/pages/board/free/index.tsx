import BoardList from '@components/Board/BoardList';

const articles = [
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
    comments: 10,
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
    comments: 18983,
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
    comments: 0,
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
    comments: 12313,
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
    comments: 283982938,
  },
];

/*
  TODO  
  -[] API 연결 후 테스트
  -[] 같은 양식으로 의사, 간호사 게시판 만들기
*/

export default function FreeBoard() {
  return <BoardList articles={articles} />;
}
