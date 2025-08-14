const input = document.getElementById("playerNameInput");
const button = document.getElementById("startButton");
const screenHome = document.getElementById("screen-home");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const startFightButton = document.getElementById("startFightButton");

let player = {
  name: "",
  avatar: "assets/avatar1.png",
  wins: 0,
  losses: 0,
};

button.addEventListener("click", () => {
  const name = input.value.trim();
  if (name) {
    player.name = name;
    console.log(`Имя сохранено: ${player.name}`);
    const screenRegister = document.querySelector(".screen-register");
    screenRegister.style.display = "none";
    playerNameDisplay.textContent = player.name;
    screenHome.style.display = "block";
  } else {
    alert("Пожалуйста, введите имя бойца.");
  }
});
