# 게시판📋

### 프로젝트 이름

게시판

### 사용 언어
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=javascript&logoColor=black">

### 구현 사항

- 구글 계정으로 로그인, 로그아웃
- 로그인을 한 경우에만 글 작성
- 글을 작성한 사람만 게시물 수정, 삭제 가능
- 게시물 제목으로 검색할 수 있는 검색 기능
- 권한이 없는 사용자는 url로 작성, 수정 페이지로 접근할 수 없도록 경로 보호
- 10개의 게시물만 보일 수 있도록 Pagination


### 문제 해결
* 작성 시간을 받아올 때 새로고침을 해야지 현재 시각을 받아올 수 있었다
  * setInterval로 1초마다 현재 시간을 받아와서 그 시간을 작성시간으로 적용하였다.
* protectedRoute 컴포넌트에서 경로 보호하려고 게시글에 작성자의 uid를 부여해서 해당 uid를 가지지 않은 사용자가 게시물에 URL에 접근하려고 하면 막히도록 시도했지만 에러가 났다.
  * URL로 수정페이지 이동할때 user의 uid를 함께 지정한 다음 protectedRoute에서 useParams로 uid를
가져올 수 있게 했다. 가져온 게시글 id와 현재 로그인 된 사용자의 uid가 일치하면 router에서 children을 보여주도록 수정하였다.
* Pagination 구현할 때 itemsCountPerPage가 적용이 되지 않아서 데이터를 10개씩 잘라서 보여주도록 했더니 다음 페이지로 넘어가면 index가 다시 1부터 시작돼서 게시글 번호를 순서대로 보여줄 수 없었다
  * 배열의 제일 최근 게시글의 listNumber를 구해서 +1을 해서 게시글을 작성할때 함께 전달한 후 PageList에서 함께
보여주도록 수정하였다.



### 배포 링크📌
https://papaya-gumdrop-a6f658.netlify.app
