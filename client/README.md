# :popcorn: Movie_Talkie (Front End)
<img src="https://user-images.githubusercontent.com/85853145/167337553-c0368c5b-be0c-460c-805a-78c172f58b5b.png" width="1000" height="550">

## Summary / 요약
- __프로젝트 기간__ : 2021.03 - 2021.05 (계속해서 부분 업데이트 중)
- __메인 개발 환경__ : ![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=white) ![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) ![Apollo GraphQL](https://img.shields.io/badge/-Apollo%20GraphQL-311C87?style=flat-square&logo=Apollo%20GraphQL&logoColor=white) ![Styled-Components](https://img.shields.io/badge/-styled%20components-DB7093?style=flat-square&logo=styled%20components&logoColor=white) ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=React%20Router&logoColor=white) ![Font Awesom](https://img.shields.io/badge/-Font%20Awesome-528DD7?style=flat-square&logo=Font%20Awesome&logoColor=white) ![Framer Motion](https://img.shields.io/badge/-Framer-0055FF?style=flat-square&logo=Framer&logoColor=white)
- **Open Data Api** : [The Movie Database Api](https://developers.themoviedb.org/3/getting-started/introduction)

## Installation / 설치
    npm install

    
## Start / 구동
    npm run start

## Layout / 구조
- #### 🎬 주요 페이지 구성 및 설명

| Menu | 하위구조 |
| ------ | ------ |
| Main | 생성된 카테고리 목록 및 카테고리 추가 버튼, 우측 상단 메뉴 버튼, 카테고리 검색 기능 |
| Create Category | 원하는 영화 검색 후 선택, 카테고리 생성 |
| Category | 해당 카테고리 영화에 대한 간단한 정보 카드, 게시글 목록 |
| Join | 카테고리 생성을 비롯한 게시글에 관련한 모든 기능을 이용시에 필수항목 (이메일, 유저네임, 비밀번호, 비밀번호 확인 으로 구성) |
| Login | 이메일, 비밀번호 입력  |
| Post Article | 해당 영화 카테고리에 맞게 게시글 작성 (대표 이미지, 제목, 내용, 게시글 비밀번호 필수 입력) |
| Edit Article | 게시글을 쓴 유저의 username과 작성 시 지정했던 암호로 인증 후 수정가능 |
| Delete Article | 게시글을 쓴 유저의 username과 작성 시 지정했던 암호로 인증 후 삭제 가능 |
