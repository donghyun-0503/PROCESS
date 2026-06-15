const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", e => {
  e.preventDefault();

  const idInput = document.querySelector("#id").value;
  const pwInput = document.querySelector("#pw").value;

  const savedData = localStorage.getItem("userList");
  const userList = savedData ? JSON.parse(savedData) : [];

  const userConfig = userList.find(user => user.userId === idInput && user.password === pwInput);

  if (userConfig) {
    alert(`${userConfig.username}님, 환영합니다`);
    localStorage.setItem("currentUser", userConfig.username);
    window.location.href = "index.html";
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
});
