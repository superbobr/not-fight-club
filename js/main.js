const input = document.getElementById("playerNameInput");
const button = document.getElementById("startButton");
const screenHome = document.getElementById("screen-home");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const startFightButton = document.getElementById("startFightButton");
let playerName = "";

button.addEventListener("click", () => {
  const name = input.value.trim();
  if (name) {
    playerName = name;
    console.log(`Имя сохранено: ${playerName}`);
    const screenRegister = document.querySelector(".screen-register");
    screenRegister.style.display = "none";
    playerNameDisplay.textContent = playerName;
    screenHome.style.display = "block";
  } else {
    alert("Пожалуйста, введите имя бойца.");
  }
});
