document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room");
  document.getElementById("chatRoomName").textContent = roomName;

  // 로컬 스토리지에서 메시지 데이터 가져오기
  let messages = JSON.parse(localStorage.getItem(roomName)) || [];

  // 채팅 메시지 렌더링
  const chatMessages = document.getElementById("chatMessages");
  messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${message.sender}: ${message.content}`;
    chatMessages.appendChild(messageDiv);
  });
});

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  const userName = localStorage.getItem("userName");
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room");

  if (!message) {
    alert("메시지를 입력하세요.");
    return;
  }

  // 로컬 스토리지에 메시지 저장
  let messages = JSON.parse(localStorage.getItem(roomName)) || [];
  messages.push({ sender: userName, content: message });
  localStorage.setItem(roomName, JSON.stringify(messages));

  // 메시지 화면에 렌더링
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${userName}: ${message}`;
  chatMessages.appendChild(messageDiv);

  messageInput.value = "";
}

function leaveChatRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room");
  let chatRooms = JSON.parse(localStorage.getItem("chatRooms")) || [];
  chatRooms = chatRooms.filter((room) => room.name !== roomName);
  localStorage.setItem("chatRooms", JSON.stringify(chatRooms));
  window.location.href = "./MySNS.html";
}
