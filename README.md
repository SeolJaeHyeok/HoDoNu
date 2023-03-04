![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=300&section=header&text=TURNING%20POINT&fontSize=90)
# HoDoNu

## 서비스 소개

간호사, 의사 등 의료 산업 종사자를 위한 커뮤니티 서비스

## Link

> [서비스 Link](https://toy-project-web-green.vercel.app/home)<br/>
> Test 계정
    id: admin@admin.com
    pw: 12345678

[회고 Link](https://velog.io/@milkboy2564/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A1%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-NextJS)

## 기술 스택
- TypeScript
- Next.js
- React-query, Recoil, MUI
- ESLint, Prettier, Husky

## 프로젝트 내 역할

1. 프로젝트 초기 설정 
    1. ESLint, Prettier, Husky 설정
    2. Convention 정의
2. 게시판 목록 페이지
    1. 단 하나의 state도 가지고 있지 않은 Pagination
    2. 키보드 이동 및 자동 완성을 포함한 검색 기능
    3. Skeleton UI
3. 관리자 페이지
    1. 회원 관리 페이지
        1. Intersection Observer와 useInfinityQueries를 활용한 커스텀 훅으로 만든 무한 스크롤
        2. Server Side에서 관리자 권한 검증
4. 마이 페이지
    1. 내 게시글 페이지
        1. Table 전체 및 부분 선택 기능
        2. 게시글 CRUD
5. 공통 컴포넌트 정의
    1. react-slick을 활용한 커스텀 슬라이더
    2. 클릭 및 드래그 앤 드랍이 가능한 파일 업로더
    3. URL에 대응되는 사이드바
6. 프로젝트 리드
    1. 매일 아침 진행되는 Daily Scrum 주도
    2. 팀원들의 진행 상황을 파악하여 효율적인 업무 분담
    3. 적극적인 코드 리뷰
