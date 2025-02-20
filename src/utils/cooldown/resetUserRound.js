const UserRound = require("./../../models/userRoundModel");
const {
  server,
  roleMembersActive1,
  roleMembersActive2,
} = require("../../../config.json");

module.exports = async (client) => {
  try {
    const guild = client.guilds.cache.get(server);

    if (guild) {
      await guild.members.fetch();
      const roleOneHours = guild.roles.cache.get(roleMembersActive1);
      const roleTwoHours = guild.roles.cache.get(roleMembersActive2);
      var memberActiveOneHours = [];
      var memberActiveTwoHours = [];

      if (roleOneHours) {
        memberActiveOneHours = roleOneHours.members.map(
          (member) => member.user.id
        );
      }

      if (roleTwoHours) {
        memberActiveTwoHours = roleTwoHours.members.map(
          (member) => member.user.id
        );
      }
    }

    let userRound = await UserRound.find({});

    for (let i = 0; i < userRound.length; i++) {
      // Verifica se o autor está na lista de membros com a role de 1 hora
      if (memberActiveOneHours.includes(userRound[i].authorId)) {
        userRound[i].countRound += 25; // Adiciona +25 (20 base + 5 bônus)
      }
      // Verifica se o autor está na lista de membros com a role de 2 horas
      else if (memberActiveTwoHours.includes(userRound[i].authorId)) {
        userRound[i].countRound += 35; // Adiciona +35 (20 base + 10 bônus)
      }
      // Caso o autor não esteja em nenhuma das roles
      else {
        userRound[i].countRound += 20; // Adiciona apenas +20 (base)
      }

      // Limita o valor máximo de countRound a 200
      if (userRound[i].countRound > 200) {
        userRound[i].countRound = 200;
      }
      await userRound[i].save();
    }
  } catch (error) {
    console.log(`Erro ao gravar dados no banco: ${error}`);
  }
};
