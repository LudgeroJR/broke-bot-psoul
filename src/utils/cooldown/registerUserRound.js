const fs = require("fs").promises;
const path = require("path");

const pathUserRound = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "cooldown",
  "userRound.json"
);

const maxRound = 100;

let saveInProgress = false;
let saveNeeded = false;

const saveJson = async (cooldownData) => {
  if (saveInProgress) {
    saveNeeded = true;
    return;
  }

  saveInProgress = true;

  try {
    await fs.writeFile(pathUserRound, JSON.stringify(cooldownData, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo JSON:", error);
  } finally {
    saveInProgress = false;
    if (saveNeeded) {
      saveNeeded = false;
      saveJson(cooldownData);
    }
  }
};

const debounceSave = (() => {
  let timer;
  return (cooldownData) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      saveJson(cooldownData);
    }, 1000);
  };
})();

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Erro ao ler ou parsear o arquivo JSON:", err);
  }
};

module.exports = async (userID) => {
  const cooldownUserRound = await readJsonFile(pathUserRound);
  let newCooldownUserRound = cooldownUserRound;

  if (!newCooldownUserRound[userID]) {
    newCooldownUserRound[userID] = { countRound: 1, cooldown: null };
  }
  if (newCooldownUserRound[userID].countRound < maxRound) {
    newCooldownUserRound[userID].countRound++;
  } else {
    const newCooldownTime = new Date();
    newCooldownTime.setHours(newCooldownTime.getHours() + 1);
    newCooldownUserRound[userID].countRound = 1;
    newCooldownUserRound[userID].cooldown = newCooldownTime.toISOString();
  }

  debounceSave(newCooldownUserRound);
};
