const writingBox = document.querySelector("#writing-box");
const writing = document.querySelector("#writing");
const confirmButton = document.querySelector("#confirm-button");
const deleteButton = document.querySelector("#delete-button");
const titleInput = document.querySelector("#title-input");
const contentInput = document.querySelector("#content-input");
let editTarget = null;

function getPosts() {
  let savedPosts = localStorage.getItem("sns_posts");

  if (savedPosts) {
    return JSON.parse(savedPosts);
  } else {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem("sns_posts", JSON.stringify(posts));
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

  const posts = getPosts();

  posts.forEach(post => {
    const postCard = document.createElement("div");

    const postTitle = document.createElement("h3");
    postTitle.textContent = post.title;

    const postAuthor = document.createElement("p");
    postAuthor.textContent = `작성자: ${post.author}`;
    postAuthor.style.fontSize = "14px";
    postAuthor.style.color = "gray";
    postAuthor.style.marginBottom = "14px";

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
  const title = titleInput.value;
  const content = contentInput.value;

  const currentUser = localStorage.getItem("currentUser") || "익명";

  let posts = getPosts();

  if (editTarget) {
    posts = posts.map(post => {
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
    posts.push(newPost);
  }

  savePosts(posts);
  renderPosts();

  titleInput.value = "";
  contentInput.value = "";
  del();
}

export function editPost(id, title, content) {
  writingNew();
  titleInput.value = title;
  contentInput.value = content;
  editTarget = id;
}

export function deletePost(id) {
  let posts = getPosts();
  posts = posts.filter(post => post.id !== id);
  savePosts(posts);
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

writing.addEventListener("click", () => {
  writingNew();
});

deleteButton.addEventListener("click", () => {
  del();
});

confirmButton.addEventListener("click", () => {
  addPost();
});

titleInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addPost();
  }
});

contentInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addPost();
  }
});

renderPosts();
