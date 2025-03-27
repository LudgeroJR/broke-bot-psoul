const { EmbedBuilder } = require("discord.js");
const _ = require("lodash");
const UserRound = require("./../models/userRoundModel");

/**
 * Gera um embed de Discord para informar sobre o aparecimento de um Pokémon.
 * @param {string} userId - ID do usuário que está encontrando o Pokémon
 * @param {Object} pokemonObject - Objeto contendo dados do Pokémon
 * @param {number} [roundLeft] - Quantidade de rodadas restantes (opcional)
 * @returns {EmbedBuilder} Embed para ser exibido no Discord
 */
module.exports = async (userId, pokemonObject, roundLeft) => {
  const pokemonName = _.startCase(_.toLower(pokemonObject.name));
  const pokemonThumb = pokemonObject.thumb;
  const isShiny = pokemonObject.shiny;
  let embed;

  // Se o Pokémon não for Shiny, constrói um embed básico
  if (!isShiny) {
    let roundsRemaining = roundLeft;
    if (!roundsRemaining) {
      // Busca no banco caso não tenha recebido roundLeft
      const query = { authorId: userId };
      const userRoundData = await UserRound.findOne(query);
      roundsRemaining = userRoundData.countRound;
    }

    const footerMsg = `Continue tentando até encontrar um Pokemon Shiny. Rodadas Restantes: ${roundsRemaining}`;

    embed = new EmbedBuilder()
      .setTitle(`${pokemonName}`)
      .setDescription(
        `Um ${pokemonName} apareceu. Infelizmente ele não é shiny, vamos deixar ele seguir seu caminho.`
      )
      .setThumbnail(pokemonThumb)
      .setFooter({
        text: footerMsg,
      });
  } else {
    // Se o Pokémon for Shiny, constrói um embed diferenciado
    embed = new EmbedBuilder()
      .setTitle(`Shiny ${pokemonName}`)
      .setDescription(
        `:star_struck: **INCRÍVEL** :star_struck: Um Shiny ${pokemonName} apareceu. Vamos tentar capturar?`
      )
      .setThumbnail(pokemonThumb)
      .setFooter({
        text: "Escolha sua Pokebola com sabedoria. **Boa Sorte**.",
      });
  }

  // Retorna o embed final
  return embed;
};
