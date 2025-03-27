// Importa o modelo UserRound para interagir com o banco de dados
const UserRound = require("../../models/userRoundModel");

// Função para verificar se o usuário ainda está em cooldown
module.exports = async (userId) => {
  // Define a consulta para buscar o registro do usuário no banco de dados
  const query = { authorId: userId };

  try {
    // Busca o registro do usuário no banco de dados
    const cooldownUserRound = await UserRound.findOne(query);

    // Lança um erro se o registro do usuário não for encontrado
    if (!cooldownUserRound) {
      throw new Error("User round not found");
    }

    // Obtém o horário atual e o horário de cooldown do usuário
    const currentTime = new Date();
    const userCooldownTime = new Date(cooldownUserRound.cooldown);

    // Retorna true se o usuário ainda estiver em cooldown, caso contrário false
    return userCooldownTime >= currentTime;
  } catch (error) {
    // Loga o erro no console e retorna false em caso de falha
    console.error(`Error: ${error.message}`);
    return false;
  }
};
