const input = document.getElementById("playerNameInput");
const button = document.getElementById("startButton");
const screenRegister = document.querySelector(".screen-register");
const screenHome = document.getElementById("screen-home");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const startFightButton = document.getElementById("startFightButton");
const goToCharacter = document.getElementById("goToCharacter");
const screenCharacter = document.getElementById("screen-character");

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
    screenRegister.style.display = "none";
    playerNameDisplay.textContent = player.name;
    screenHome.style.display = "block";
  } else {
    alert("Пожалуйста, введите имя бойца.");
  }
});

goToCharacter.addEventListener("click", function () {
  screenRegister.style.display = "none";
  updateCharacterScreen();
  screenCharacter.style.display = "block";
});

function updateCharacterScreen() {
  document.getElementById("charPlayerName").textContent = player.name;
  document.getElementById("characterAvatar").src = player.avatar;
  document.getElementById("wins").textContent = player.wins;
  document.getElementById("losses").textContent = player.losses;
}
