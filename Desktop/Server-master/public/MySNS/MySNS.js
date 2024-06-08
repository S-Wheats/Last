// MySNS.js

/* SNS Part Script.js */
var h = screen.height - 300;
var w = screen.width;
var x = screen.width / 2;

function openChatRoom() {
  window.open(
    "./MyChat.html",
    "Chatting Room",
    "width=" +
      w +
      ", height=" +
      h +
      ", top=50, left=" +
      x +
      ", resizable=no, scrollbars=no, status=no, location=no, toolbar=no, menubar=no"
  );
}

// 로컬 스토리지에서 게시글 데이터 가져오기
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// 페이지 로드 시 게시글 목록 및 채팅방 목록 렌더링
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  renderChatRooms(); // 채팅방 목록 렌더링
});

// 게시글 작성 폼 표시 함수
function showPostForm() {
  document.getElementById("postForm").style.display = "block";
  document.getElementById("postList").style.display = "none";
}

// 게시글 작성 폼 숨김 함수
function hidePostForm() {
  document.getElementById("postForm").style.display = "none";
  document.getElementById("postList").style.display = "block";
}

// 채팅방 생성 폼 표시 함수
function showChatRoomForm() {
  document.getElementById("chatRoomForm").style.display = "block";
  document.getElementById("postList").style.display = "none";
}

// 채팅방 생성 폼 숨김 함수
function hideChatRoomForm() {
  document.getElementById("chatRoomForm").style.display = "none";
  document.getElementById("postList").style.display = "block";
}

// 게시글 작성 함수
function submitPost() {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const userEmail = localStorage.getItem("userEmail");

  if (!title || !content) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  const newPost = {
    id: posts.length + 1,
    title: title,
    content: content,
    userEmail: userEmail,
    comments: [],
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts)); // 로컬 스토리지에 저장
  renderPosts();

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  hidePostForm();
}

// 채팅방 생성 함수
function createChatRoom() {
  const chatRoomName = document.getElementById("chatRoomName").value.trim();
  if (!chatRoomName) {
    alert("채팅방 이름을 입력하세요.");
    return;
  }

  // 로컬 스토리지에 채팅방 저장
  let chatRooms = JSON.parse(localStorage.getItem("chatRooms")) || [];
  chatRooms.push({ name: chatRoomName });
  localStorage.setItem("chatRooms", JSON.stringify(chatRooms));

  alert("채팅방이 생성되었습니다.");
  hideChatRoomForm();
  renderChatRooms();
}
function renderChatRooms() {
  const chatRoomList = document.getElementById("chatRoomList");
  chatRoomList.innerHTML = "";

  let chatRooms = JSON.parse(localStorage.getItem("chatRooms")) || [];
  chatRooms.forEach((chatRoom) => {
    const chatRoomDiv = document.createElement("div");
    chatRoomDiv.className = "flex flex-col items-center p-2";
    chatRoomDiv.style.width = "100px"; // 채팅방 아이콘 너비 설정
    chatRoomDiv.style.marginRight = "10px"; // 각 채팅방 아이콘 사이 간격 설정
    chatRoomDiv.innerHTML = `
          <svg data-slot="icon" class="w-10 h-10 mb-2" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
          </svg>
          <div class="text-center text-xs font-bold">${chatRoom.name}</div>
      `;
    chatRoomList.appendChild(chatRoomDiv);
  });
}

// 게시글 목록 렌더링 함수
function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = '<h2 class="text-xl font-bold mb-4">게시글 목록</h2>';

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "p-4 border-b";
    postDiv.innerHTML = `
            <h3 class="text-lg font-bold">${post.title}</h3>
            <p class="text-gray-700">${post.content}</p>
            ${
              post.userEmail === localStorage.getItem("userEmail")
                ? `<button onclick="deletePost(${post.id})" class="text-red-500">삭제</button>`
                : ""
            }
            <div id="comments-${post.id}" class="mt-2">
                <h4 class="text-md font-bold">댓글</h4>
                <div class="ml-4">${renderComments(post.comments)}</div>
                <input type="text" id="commentInput-${
                  post.id
                }" class="w-full p-1 border rounded mt-2" placeholder="댓글을 입력하세요">
                <button onclick="submitComment(${
                  post.id
                })" class="mt-1 p-1 bg-blue-500 text-white rounded">댓글 작성</button>
            </div>
        `;
    postList.appendChild(postDiv);
  });
}

// 게시글 삭제 함수
function deletePost(postId) {
  if (confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
    posts = posts.filter((post) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts)); // 로컬 스토리지에 저장
    renderPosts();
  }
}

// 댓글 렌더링 함수
function renderComments(comments) {
  return comments.map((comment) => `<p>${comment}</p>`).join("");
}

// 댓글 작성 함수
function submitComment(postId) {
  const commentInput = document.getElementById(`commentInput-${postId}`);
  const comment = commentInput.value.trim();

  if (!comment) {
    alert("댓글을 입력하세요.");
    return;
  }

  const post = posts.find((post) => post.id === postId);
  post.comments.push(comment);
  localStorage.setItem("posts", JSON.stringify(posts)); // 로컬 스토리지에 저장
  renderPosts();
}
