const UserRound = require("./../../models/userRoundModel");
const {
  server,
  roleMembersActive1,
  roleMembersActive2,
} = require("../../../config.json");

module.exports = async (client) => {
  try {
    // Obtém o servidor (guild) pelo ID configurado
    const guild = client.guilds.cache.get(server);
    var memberActiveOneHours;
    var memberActiveTwoHours;

    if (guild) {
      // Garante que todos os membros do servidor sejam carregados
      await guild.members.fetch();

      // Obtém as roles configuradas
      const roleOneHours = guild.roles.cache.get(roleMembersActive1);
      const roleTwoHours = guild.roles.cache.get(roleMembersActive2);

      // Inicializa arrays para armazenar IDs de membros com as roles específicas
      memberActiveOneHours = roleOneHours
        ? roleOneHours.members.map((member) => member.user.id)
        : [];
      memberActiveTwoHours = roleTwoHours
        ? roleTwoHours.members.map((member) => member.user.id)
        : [];
    }

    // Busca todos os registros de UserRound no banco de dados
    const userRounds = await UserRound.find({});

    for (const userRound of userRounds) {
      // Verifica se o autor está na lista de membros com a role de 1 hora
      if (memberActiveOneHours.includes(userRound.authorId)) {
        userRound.countRound += 25; // Adiciona +25 (20 base + 5 bônus)
      }
      // Verifica se o autor está na lista de membros com a role de 2 horas
      else if (memberActiveTwoHours.includes(userRound.authorId)) {
        userRound.countRound += 30; // Adiciona +30 (20 base + 10 bônus)
      }
      // Caso o autor não esteja em nenhuma das roles
      else {
        userRound.countRound += 20; // Adiciona apenas +20 (base)
      }

      // Limita o valor máximo de countRound a 200
      userRound.countRound = Math.min(userRound.countRound, 200);

      // Salva as alterações no banco de dados
      await userRound.save();
    }
  } catch (error) {
    // Loga o erro caso ocorra algum problema
    console.log(`Erro ao gravar dados no banco: ${error}`);
  }
};
