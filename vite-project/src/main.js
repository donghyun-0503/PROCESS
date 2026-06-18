const writingBox = document.querySelector("#writing-box");
const writing = document.querySelector("#writing");
const confirmButton = document.querySelector("#confirm-button");
const deleteButton = document.querySelector("#delete-button");
const titleInput = document.querySelector("#title-input");
const contentInput = document.querySelector("#content-input");
const deleteUserBtn = document.querySelector("#delete-user");
let editTarget = null;
let data = [];

async function getPosts() {
  try {
    const response = await fetch("https://post-api.chaeyn.com/api/posts");

    data = await response.json();
    renderPosts();
  } catch (error) {
    console.error(error);
  }
}

function createBoardArea() {
  let board = document.querySelector("#board");
  if (!board) {
    board = document.createElement("div");
    board.id = "board";
    document.body.append(board);
  }
  return board;
}

function renderPosts() {
  const board = createBoardArea();
  board.innerHTML = "";

  data.forEach(post => {
    const postCard = document.createElement("div");

    const postTitle = document.createElement("h3");
    postTitle.textContent = post.title;

    const postAuthor = document.createElement("p");
    postAuthor.textContent = `작성자: ${post.authorEmail || "익명"}`;
    postAuthor.style.fontSize = "14px";
    postAuthor.style.color = "gray";
    postAuthor.style.marginBottom = "15px";

    const postText = document.createElement("p");
    postText.textContent = post.content;

    const editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.addEventListener("click", () => {
      editPost(post.id, post.title, post.content);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.addEventListener("click", () => {
      deletePost(post.id);
    });

    postCard.append(postTitle);
    postCard.append(postAuthor);
    postCard.append(postText);
    postCard.append(editBtn);
    postCard.append(delBtn);
    board.prepend(postCard);
  });
}

export function addPost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const currentUser = localStorage.getItem("currentUser") || "익명";

  if (!title || !content) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  if (editTarget) {
    data = data.map(post => {
      if (post.id === editTarget) {
        return { ...post, title: title, content: content };
      }
      return post;
    });
    editTarget = null;
  } else {
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      author: currentUser,
    };
    data.push(newPost);
  }

  renderPosts();
  del();
}

export function editPost(id, title, content) {
  writingNew();
  titleInput.value = title;
  contentInput.value = content;
  editTarget = id;
}

export function deletePost(id) {
  data = data.filter(post => post.id !== id);
  renderPosts();
}

export function writingNew() {
  writingBox.style.display = "flex";
  confirmButton.style.display = "block";
  deleteButton.style.display = "block";
}

export function del() {
  writingBox.style.display = "none";
  deleteButton.style.display = "none";
  confirmButton.style.display = "none";
  titleInput.value = "";
  contentInput.value = "";
  editTarget = null;
}

export function deleteAccount() {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser || currentUser === "익명") {
    alert("로그인 상태가 아닙니다.");
    window.location.href = "login.html";
    return;
  }

  if (confirm("정말로 탈퇴하시겠습니까?")) {
    const savedUsers = localStorage.getItem("userList");
    let userList = savedUsers ? JSON.parse(savedUsers) : [];

    userList = userList.filter(user => user.username !== currentUser);
    localStorage.setItem("userList", JSON.stringify(userList));

    localStorage.removeItem("currentUser");

    alert("회원 탈퇴가 완료되었습니다.");
    window.location.href = "login.html";
  }
}

writing.addEventListener("click", () => {
  writingNew();
});

deleteButton.addEventListener("click", () => {
  del();
});

confirmButton.addEventListener("click", () => {
  addPost();
});

deleteUserBtn.addEventListener("click", () => {
  deleteAccount();
});

getPosts();
