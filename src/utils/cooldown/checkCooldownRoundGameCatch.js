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

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Erro ao ler ou parsear o arquivo JSON:", err);
  }
};

module.exports = async (userId) => {
  const cooldownUserRound = await readJsonFile(pathUserRound);

  const currentTime = new Date();
  // Atualiza registro existente ou adiciona novo
  if (!cooldownUserRound[userId]) {
    return false;
  } else {
    const userCooldownTime = new Date(cooldownUserRound[userId].cooldown);

    if (userCooldownTime > currentTime) {
      return true;
    } else {
      return false;
    }
  }
};
