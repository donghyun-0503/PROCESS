const writingBox = document.querySelector("#writing-box");
const writing = document.querySelector("#writing");
const confirmButton = document.querySelector("#confirm-button");
const deleteButton = document.querySelector("#delete-button");
const titleInput = document.querySelector("#title-input");
const contentInput = document.querySelector("#content-input");
let editTargetId = null;

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
    postCard.append(postText);
    postCard.append(editBtn);
    postCard.append(delBtn);
    board.prepend(postCard);
  });
}

export function addPost() {
  const title = titleInput.value;
  const content = contentInput.value;

  let posts = getPosts();

  if (editTargetId) {
    posts = posts.map(post => {
      if (post.id === editTargetId) {
        return { ...post, title: title, content: content };
      }
      return post;
    });
    editTargetId = null;
  } else {
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
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
  editTargetId = id;
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
  editTargetId = null;
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

contentInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    addPost();
  }
});

renderPosts();
