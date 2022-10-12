# toy-project-web

커밋 테스트용 입니다.

## Todo List

- with Next.js, Typescript, materialUI

1. todo CRUD
2. dev 환경과 production 환경 분리하기

   ⇒ nextjs에서 build 전인 dev와 build 후인 production의 .env 파일이 분리가 가능하므로 해당 방법으로 dev와 production 분리함(URL)

3. todo 삭제 시 비밀번호 입력 기능 추가하기

   dev에서 todo 삭제 시 바로 삭제 가능하게 구현하고

   production에서 todo 삭제 시 비밀번호 입력 후 삭제 가능하도록 구현

4. Pagination
   - API 를 통한 pagination
     ⇒ 해당 페이지에 필요한 데이터만 가져와서 사용함
   - nextjs의 dynamic routing을 이용한 pagination
     ⇒ 전체 데이터를 `getServerSideProps` 로 가져와서 사용함
5. css styling
   - MUI theme 사용해서 dev와 production theme 색 분리하기
