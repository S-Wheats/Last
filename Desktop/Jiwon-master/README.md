# S-Wheats

## 프로젝트 개요

Node.js와 MongoDB를 사용하여 회원가입 및 로그인 기능을 제공

## 프로젝트 구조

s-wheats_back/
│
├── node_modules/
├── public/
│ └── html, css, js 파일
│
│
│
│
│
│
├── src/
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── user.js
│ ├── app.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## 설치 및 실행 방법

### 1. MongoDB 설치 및 실행

#### 로컬 MongoDB 설치

1. [MongoDB 다운로드 페이지](https://www.mongodb.com/try/download/community)로 이동하여 운영 체제에 맞는 MongoDB Community Server를 다운로드합니다.
2. 설치 프로그램을 실행하고 지시에 따라 MongoDB를 설치합니다.
3. MongoDB 설치가 완료되면, MongoDB 서비스를 시작합니다. 기본적으로 MongoDB는 포트 `27017`에서 실행됩니다.

## 2. 프로젝트 설정

#### 종속성 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 필요한 종속성을 설치합니다:

```sh
npm install
```

## 3. 서버 실행

서버를 실행하려면 다음 명령어를 사용합니다 :

```sh
npm run dev
```

## 4. 브라우저에서 접속

브라우저에서 다음 URL로 접속하여 회원가입 및 로그인 페이지를 확인할 수 있습니다:

회원가입 페이지: http://localhost:3000/signup.html
로그인 페이지: http://localhost:3000/login.html
