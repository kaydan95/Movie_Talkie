# :popcorn: Movie_Talkie [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
<img src="https://user-images.githubusercontent.com/85853145/167337553-c0368c5b-be0c-460c-805a-78c172f58b5b.png" width="1000" height="500">

> 평소 좋아하는 영화에 대해 의견을 나누는 걸 좋아하는 제가 꿈꿔왔던 공간을 React CRUD 프로젝트라는 명목으로 작지만 비슷하게나마 만들어보자 해서 시작하게 된 (개인적인) 프로젝트입니다. client는 React + Typescript 기반, server 는 Apollo Graphql + TypeScript 기반입니다. 만들고자하는 영화의 카테고리를 생성하는 것 부터 시작하여 글을 작성, 수정, 삭제 할 수 있는 기능까지 기본적인 CRUD 기능 모두 구현되어 있습니다. 😃



## :paperclip: Summary / 요약 

- **목적** : React 기반 CRUD 를 만들어보고 싶다는 도전 정신 + GraphQl에 대한 호기심 + 개인적으로 꿈꿔봤던 공간 실현이라는 욕심
- **메인 개발 환경** : React / Typescript / GraphQl / Node.JS / ts-node
- **Data Api** : [The Movie Database Api](https://developers.themoviedb.org/3/getting-started/introduction)
- **배포** : [Movie-Talkie](https://movie-talkie.netlify.app/)





## :round_pushpin: Features / 특징
### 1. 기본적인 CRUD 기능은 회원기반으로만!
- 처음 프로젝트 구성 당시에는 회원가입이라는 기능은 따로 없이 글을 쓸 때 유저이름과 해당 게시글에 대한 비밀번호만 설정하면 누구든 글을 쓰는 것이 가능하도록 설계했다. 하지만 점점 만들고 싶은 공간이 구체화 되면서 글을 관리하는 측면에서 비효율적이라 생각이 들어 __작성된 글을 열람하는 것을 제외한 모든 기능은 회원가입을 한 사람만 가능__ 하도록 수정했다. 가입을 해도 상관은 없지만 아래에 있는 정보를 이용하면 바로 로그인이 가능하다.
```
 userid : test@test.com
 userpassword : test11
```
### 2. 영화 카테고리는 중복생성이 불가
- __문제점__ : 초반 가장 고민을 많이 했던 부분 중 하나이다. 카테고리 제목만 다르게 해서 같은 영화에 대한 카테고리가 중복되어 여러개 생성 될 수도 있기 때문. 영화 제목에 대한 중복 검사 기능을 추가할 수 있지만 범위가 너무 넓었다.
- __해결방안__ : 만들고자 하는 영화 카테고리에 대한 정보를 검색 한 후 선택한 영화 정보를 기반으로 카테고리를 만들면 어떨까 라는 생각이 들었다. 검색에 사용된 Data Api는 [The Movie Database Api](https://developers.themoviedb.org/3/getting-started/introduction) . 검색 결과에 따른 영화를 선택하면 제목, 개봉일, 런타임, category id, 장르 가 기본적으로 입력되게 설정했다. 무엇보다 영화에 대한 고유 key 가 있기때문에 이를 DB 상의 category id로 설정하는 방법으로 카테고리 중복 생성을 쉽게 막을 수 있었다.  아래 이미지는 실제 카테고리 생성 시 구현 화면이다.
  
  <img src="https://user-images.githubusercontent.com/85853145/167347537-281b9221-3239-4fb5-a20b-fa7caa13f682.gif" width="800" height="500">
  
### 3. 생성하기 전에 먼저 검색부터!
- 카테고리를 생성 하기 전에, 이미 만들어진 카테고리들을 기반으로 검색할 수 있도록 했다. 페이지 상단의 검색부분에서 검색이 가능하다. 아래 이미지는 실제 카테고리 검색 시 구현 화면이다.
  
  <img src="https://user-images.githubusercontent.com/85853145/167352949-a4286424-ba52-4af9-8cea-29ae40c5d649.gif" width="800" height="500">


### 4. 게시글에 대한 암호 지정
- 보안 상 당연한 이야기이겠지만 보통 내가 쓴 글을 수정하거나 삭제하고 싶을 때 꼭 로그인을 해야한다는 사실이 조금 귀찮았다. 내가 쓴 글이 그렇게 많지 않을때, 검색만으로 내 글을 찾아서 바로 삭제할 수 있다면 좋지 않을까.
- 그래서 글에 대한 수정과 삭제에는 인증수단으로써 해당 글을 쓴 사람의 username 과 게시글에 대한 암호를 지정했다. 보안을 더 강력하게 하기 위해 username은 회원들끼리 중복되지 않게 설정했고, 게시글을 쓴 당사자를 제외한 타인이 게시글에 대한 암호를 알아내더라도 username을 알아내기 어렵도록 게시글에는 username의 앞 글자 세자리만 공개되도록 구현했다. 아래 이미지는 실제 글 수정 시 구현화면이다.

  <img src="https://user-images.githubusercontent.com/85853145/167350930-acf47367-075d-4991-85b0-b456e21aed46.gif" width="800" height="500">




## :memo: Things need to add / 추가하고 싶은 부분
#### 1. MyPage 기능!
- 회원전용 기능이 있는 만큼 마이페이지 부분을 추가하고 싶다. 회원이 쓴 게시글을 모아볼 수 있는 공간과 회원 비밀번호와 같은 개인정보를 변경할 수 있는 공간도 만들어보려한다.

#### 2. 게시글 검색기능!
- 게시글이 쌓이고 쌓이다 보면 많아질테니까..꼭 필요한 기능이라고 생각한다!

#### 3. 최근 업데이트 순으로 게시글 표시하기
- 만들다보니 놓치고 있었던 부분이다. 업데이트 한다면 가장 먼저 해야할 부분!

## 🚀 Deploy / 배포 완료
- 프론트 단은 [Netlify](https://www.netlify.com/) 으로 백은 [Heroku](https://dashboard.heroku.com/apps) 를 이용해 배포했다.
- Heroku 특징 상 30분 이상 트래픽이 없으면 sleep 모드로 들어가 깨우기 시간이 걸린다..! 그래도 조금만 기다리면 뜨니까...!

### 배포시 마주했던 문제점들
1. 배포 시 사용할 DB의 부재   
__해결__ : local 에서 MySQL 을 DB로 사용하고 있어서 배포시 이용할 ClearDBMySQL 을 추가 연결 처리해야했다.
2. port 차이에서 오는 쿠키 저장 문제   
__문제__ : 배포 후 프론트와 백의 포트가 달라져 httpOnly로  저장되어야할 refreshToken 이 저장되지 않았다.   
__해결__ : 쿠키 생성 및 저장 시 option에 `sameStie : "none"` 설정을 추가
