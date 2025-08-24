document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("playerNameInput");
  const button = document.getElementById("startButton");
  const screenRegister = document.querySelector(".screen-register");
  const screenHome = document.getElementById("screen-home");
  const playerNameDisplay = document.getElementById("playerNameDisplay");
  const startFightButton = document.getElementById("startFightButton");
  const goToCharacter = document.getElementById("goToCharacter");
  const screenCharacter = document.getElementById("screen-character");
  const avatarOptions = document.querySelectorAll(".avatar-option");
  const screenSettings = document.getElementById("screen-settings");
  const currentName = document.getElementById("currentName");
  const newNameInput = document.getElementById("newNameInput");
  const saveNameButton = document.getElementById("saveName");
  const backToHomeFromSettings = document.getElementById(
    "backToHomeFromSettings"
  );
  const goToSettings = document.getElementById("goToSettings");
  const attackButton = document.getElementById("attackButton");
  const screenFight = document.getElementById("screen-fight");
  const backToHomeFromFight = document.getElementById("backToHomeFromFight");

  let player = loadPlayer() || {
    name: "",
    avatar: "assets/avatar1.png",
    wins: 0,
    losses: 0,
    health: 100,
    maxHealth: 100,
    attack: 10,
    critChance: 0.2,
    attackZones: 1,
    defendZones: 2,
  };

  if (player.name) {
    screenRegister.style.display = "none";
    screenHome.style.display = "block";
    playerNameDisplay.textContent = player.name;
    updateCharacterScreen();
  } else {
    screenRegister.style.display = "flex";
    screenHome.style.display = "none";
  }

  button.addEventListener("click", () => {
    const name = input.value.trim();
    if (name) {
      player.name = name;
      savePlayer();
      console.log(`Имя сохранено: ${player.name}`);
      screenRegister.style.display = "none";
      playerNameDisplay.textContent = player.name;
      screenHome.style.display = "flex";
    } else {
      alert("Пожалуйста, введите имя бойца.");
    }
  });

  goToCharacter.addEventListener("click", function () {
    screenRegister.style.display = "none";
    screenSettings.style.display = "none";
    updateCharacterScreen();
    screenCharacter.style.display = "flex";
  });

  function updateCharacterScreen() {
    document.getElementById("charPlayerName").textContent = player.name;
    document.getElementById("characterAvatar").src = player.avatar;
    document.getElementById("wins").textContent = player.wins;
    document.getElementById("losses").textContent = player.losses;
  }

  avatarOptions.forEach((img) => {
    img.addEventListener("click", function () {
      player.avatar = this.src;
      document.getElementById("characterAvatar").src = player.avatar;
      savePlayer();
      console.log("Аватар изменён на:", player.avatar);
    });
  });

  document.getElementById("backToHome").addEventListener("click", function () {
    screenCharacter.style.display = "none";
    screenHome.style.display = "flex";
  });

  function clearSelection() {
    document
      .querySelectorAll(".attack-zone")
      .forEach((btn) => btn.classList.remove("selected"));
    document
      .querySelectorAll(".defend-zone")
      .forEach((btn) => btn.classList.remove("selected"));
  }

  function updateAttackButton() {
    const attackZone = document.querySelector(".attack-zone.selected");
    const defendZones = document.querySelectorAll(".defend-zone.selected");
    const isReady = attackZone && defendZones.length === player.defendZones; // 2 зоны защиты

    document.getElementById("attackButton").disabled = !isReady;
  }

  goToSettings.addEventListener("click", function () {
    screenHome.style.display = "none";
    currentName.textContent = player.name;
    screenSettings.style.display = "flex";
  });

  saveNameButton.addEventListener("click", function () {
    const newName = newNameInput.value.trim();

    if (newName && newName !== player.name) {
      player.name = newName;
      savePlayer();
      playerNameDisplay.textContent = player.name;
      currentName.textContent = player.name;
      document.getElementById("charPlayerName").textContent = player.name;
      document.getElementById("fightPlayerName").textContent = player.name;
      alert(`Имя изменено на: ${newName}`);
      newNameInput.value = "";
    } else if (newName === player.name) {
      alert("Это уже ваше имя!");
    } else {
      alert("Введите корректное имя");
    }
  });

  document.querySelectorAll(".attack-zone").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".attack-zone")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      updateAttackButton();
    });
  });

  document.querySelectorAll(".defend-zone").forEach((btn) => {
    btn.addEventListener("click", function () {
      const selected = document.querySelectorAll(".defend-zone.selected");
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
      } else if (selected.length < 2) {
        this.classList.add("selected");
      } else {
        alert("Можно выбрать только 2 зоны для защиты!");
      }
      updateAttackButton();
    });
  });

  backToHomeFromSettings.addEventListener("click", function () {
    screenSettings.style.display = "none";
    screenHome.style.display = "flex";
  });

  startFightButton.addEventListener("click", function () {
    screenHome.style.display = "none";
    setupNewBattle();
    screenFight.style.display = "flex";
  });

  function setupNewBattle() {
    player.health = player.maxHealth;
    const enemies = [
      {
        name: "Джон",
        avatar: "assets/enemy1.png",
        maxHealth: 100,
        attack: 10,
        critChance: 0.15,
        attackZones: 1,
        defendZones: 2,
      },
      {
        name: "Лом",
        avatar: "assets/enemy2.png",
        maxHealth: 100,
        attack: 15,
        critChance: 0.1,
        attackZones: 1,
        defendZones: 3,
      },
      {
        name: "Молот",
        avatar: "assets/enemy3.png",
        maxHealth: 100,
        attack: 8,
        critChance: 0.25,
        attackZones: 2,
        defendZones: 1,
      },
    ];

    const enemyTemplate = enemies[Math.floor(Math.random() * enemies.length)];

    window.currentEnemy = {
      ...enemyTemplate,
      currentHealth: enemyTemplate.maxHealth,
    };

    document.getElementById("playerAvatar").src = player.avatar;
    document.getElementById("enemyAvatar").src = window.currentEnemy.avatar;
    document.getElementById("playerHealth").textContent = player.health;
    document.getElementById("enemyHealth").textContent =
      window.currentEnemy.currentHealth;
    document.getElementById("fightPlayerName").textContent = player.name;
    document.getElementById("fightEnemyName").textContent = currentEnemy.name;
    clearSelection();
    updateAttackButton();

    document.getElementById("logEntries").innerHTML = "";
  }

  attackButton.addEventListener("click", function () {
    const attackZone = document.querySelector(".attack-zone.selected");
    const defendZones = document.querySelectorAll(".defend-zone.selected");

    if (!attackZone || defendZones.length !== 2) {
      alert("Выберите одну зону для атаки и две для защиты!");
      return;
    }

    const playerAttackZone = attackZone.dataset.zone;
    const playerDefendZones = Array.from(defendZones).map(
      (btn) => btn.dataset.zone
    );

    const enemyAttackZones = getRandomZones(
      ["head", "body", "legs"],
      window.currentEnemy.attackZones
    );
    const enemyDefendZones = getRandomZones(
      ["head", "body", "legs"],
      window.currentEnemy.defendZones
    );

    executeFightRound(
      playerAttackZone,
      playerDefendZones,
      enemyAttackZones,
      enemyDefendZones
    );

    clearSelection();
    updateAttackButton();
  });

  function getRandomZones(allZones, count) {
    const shuffled = [...allZones].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function executeFightRound(
    playerAttack,
    playerDefend,
    enemyAttacks,
    enemyDefend
  ) {
    const logEntries = document.getElementById("logEntries");
    let playerDamage = 0;
    let enemyDamage = 0;

    for (const zone of enemyAttacks) {
      const isBlocked = enemyDefend.includes(zone);
      const isCrit = Math.random() < player.critChance;
      let damage = isCrit ? player.attack * 1.5 : player.attack;
      let resultText = "";

      if (isCrit && isBlocked) {
        enemyDamage += damage;
        resultText = `<span class="log-entry critical">🔥 КРИТ! Вы пробили блок противника в зоне "${zone}" и нанесли ${damage} урона!</span>`;
      } else if (isBlocked) {
        resultText = `<span class="log-entry miss">🛡️ Противник блокировал ваш удар в зону "${zone}". Урон не нанесён.</span>`;
      } else {
        enemyDamage += damage;
        resultText = `<span class="log-entry hit">${
          isCrit ? "💥 КРИТ! " : ""
        }Вы ударили противника в зону "${zone}" и нанесли ${damage} урона!</span>`;
      }

      const logEntry = document.createElement("div");
      logEntry.innerHTML = resultText;
      logEntries.appendChild(logEntry);
    }

    for (const zone of enemyAttacks) {
      const isBlocked = playerDefend.includes(zone);
      const isCrit = Math.random() < window.currentEnemy.critChance;
      let damage = isCrit
        ? window.currentEnemy.attack * 1.5
        : window.currentEnemy.attack;
      let resultText = "";

      if (isCrit && isBlocked) {
        playerDamage += damage;
        resultText = `<span class="log-entry critical">🔥 КРИТ! Враг пробил ваш блок в зоне "${zone}" и нанёс ${damage} урона!</span>`;
      } else if (isBlocked) {
        resultText = `<span class="log-entry miss">🛡️ Вы блокировали удар врага в зону "${zone}". Урон не получен.</span>`;
      } else {
        playerDamage += damage;
        resultText = `<span class="log-entry hit">${
          isCrit ? "💥 КРИТ! " : ""
        }Враг ударил вас в зону "${zone}" и нанёс ${damage} урона!</span>`;
      }

      const logEntry = document.createElement("div");
      logEntry.innerHTML = resultText;
      logEntries.appendChild(logEntry);
    }

    player.health = Math.max(0, player.health - playerDamage);
    window.currentEnemy.currentHealth = Math.max(
      0,
      window.currentEnemy.currentHealth - enemyDamage
    );

    document.getElementById("playerHealth").textContent = player.health;
    document.getElementById("enemyHealth").textContent =
      window.currentEnemy.currentHealth;

    if (player.health <= 0) {
      player.losses++;
      savePlayer();
      alert("Вы проиграли бой!");
      endBattle();
    } else if (window.currentEnemy.currentHealth <= 0) {
      player.wins++;
      savePlayer();
      alert("Победа!");
      endBattle();
    }
  }

  function endBattle() {
    updateCharacterScreen();

    screenFight.style.display = "none";
    screenHome.style.display = "flex";
  }

  backToHomeFromFight.addEventListener("click", function () {
    screenFight.style.display = "none";
    screenHome.style.display = "flex";
  });
  function savePlayer() {
    localStorage.setItem("notFightClubPlayer", JSON.stringify(player));
  }

  localStorage;
  function loadPlayer() {
    const saved = localStorage.getItem("notFightClubPlayer");
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  }
});
