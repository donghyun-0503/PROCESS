const formTag = document.querySelector("#formTag");

formTag.addEventListener("submit", e => {
  if (!formTag.checkValidity()) {
    return;
  }
  e.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const idInput = document.querySelector("#id").value;
  const pwdInput = document.querySelector("#pw").value;

  if (nameInput === "" || idInput === "" || pwdInput === "") {
    alert("이름, ID, 비밀번호를 제대로 입력해주세요.");
    return;
  }

  const savedUsers = localStorage.getItem("userList");
  let userList;

  if (savedUsers) {
    userList = JSON.parse(savedUsers);
  } else {
    userList = [];
  }

  const isDuplicate = userList.some(user => user.userId === idInput);
  if (isDuplicate) {
    alert("이미 존재하는 아이디입니다. 다른 아이디를 입력해 주세요.");
    return;
  }

  const newUser = {
    username: nameInput,
    userId: idInput,
    password: pwdInput,
  };

  userList.push(newUser);
  localStorage.setItem("userList", JSON.stringify(userList));

  alert("회원 가입 완료");
  formTag.reset();

  window.location.href = "/vite-project/login.html";
});
