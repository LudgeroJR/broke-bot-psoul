// Importa o modelo UserRound para interagir com o banco de dados
const UserRound = require("../../models/userRoundModel");

// Cria um novo registro de cooldown para o usuário
async function createNewCooldownUserRound(userID) {
  // Define o horário inicial do cooldown (hora atual, minutos e segundos zerados)
  let newCooldownTime = new Date();
  newCooldownTime.setHours(newCooldownTime.getHours());
  newCooldownTime.setMinutes(0);
  newCooldownTime.setSeconds(0);
  newCooldownTime.setMilliseconds(0);

  // Cria um novo documento no banco de dados com os dados do usuário
  const newCooldownUserRound = new UserRound({
    authorId: userID,
    countRound: 19, // Número inicial de rodadas
    cooldown: newCooldownTime.toISOString(), // Horário inicial do cooldown
  });

  // Salva o documento no banco de dados e trata possíveis erros
  await newCooldownUserRound.save().catch((e) => {
    console.log(`Erro ao gravar dados no banco: ${e}`);
  });
}

// Atualiza o cooldown do usuário existente
function updateCooldownUserRound(cooldownUserRound) {
  // Se ainda houver rodadas disponíveis, decrementa o contador
  if (cooldownUserRound.countRound > 0) {
    cooldownUserRound.countRound--;
  } else {
    // Caso contrário, atualiza o horário do cooldown para a próxima hora cheia
    let updateCooldownTime = new Date();
    updateCooldownTime.setHours(updateCooldownTime.getHours() + 1);
    updateCooldownTime.setMinutes(0);
    updateCooldownTime.setSeconds(0);
    updateCooldownTime.setMilliseconds(0);
    cooldownUserRound.cooldown = updateCooldownTime.toISOString();
  }
}

// Função principal que gerencia o cooldown do usuário
module.exports = async (userID) => {
  // Define a consulta para buscar o usuário no banco de dados
  const query = { authorId: userID };

  // Busca o registro do usuário no banco de dados
  let cooldownUserRound = await UserRound.findOne(query);

  // Se o registro não existir, cria um novo
  if (!cooldownUserRound) {
    await createNewCooldownUserRound(userID);
    return;
  }

  // Atualiza o registro existente
  updateCooldownUserRound(cooldownUserRound);

  // Salva as alterações no banco de dados e trata possíveis erros
  await cooldownUserRound.save().catch((e) => {
    console.log(`Erro ao gravar dados no banco: ${e}`);
  });
  return cooldownUserRound.countRound;
};
