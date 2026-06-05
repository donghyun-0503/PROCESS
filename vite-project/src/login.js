const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", e => {
  e.preventDefault();

  const loginIdInput = document.querySelector("#id").value.trim();
  const loginPwInput = document.querySelector("#pw").value.trim();

  const savedData = localStorage.getItem("userData");

  const userConfig = JSON.parse(savedData);

  if (loginIdInput === userConfig.userId && loginPwInput === userConfig.password) {
    alert(`${userConfig.username}님, 환영합니다! 로그인 성공!`);
    window.location.href = "/vite-project/index.html";
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
});
