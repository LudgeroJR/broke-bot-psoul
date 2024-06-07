const { EmbedBuilder } = require("discord.js");
const _ = require("lodash");

module.exports = (pokemonObject, ballName, pointBall, finalResult, Author) => {
  //const pokemonId = pokemonObject.id;
  const pokemonName = _.startCase(_.toLower(pokemonObject.name));
  const pokemonThumb = pokemonObject.thumb;
  var embedShinyMessageGlobal;
  const avatarAuthor = Author.displayAvatarURL();

  if (pointBall >= finalResult) {
    embedShinyMessageGlobal = new EmbedBuilder()
      .setDescription(
        `**[${pointBall}/${finalResult}]** :white_check_mark: ${Author.globalName} capturou um Shiny ${pokemonName} usando uma ${ballName}.\n@everyone`
      )
      .setAuthor({
        name: `Shiny ${pokemonName}`,
        iconURL: avatarAuthor,
      })
      .setThumbnail(pokemonThumb)
      .setFooter({
        text: "As mensagens de conquistas exibidas são meramente ilustrativas e não correspondem a eventos reais ocorridos em qualquer jogo. Guild ARKHAM",
      })
      .setColor("Green");
  } else {
    embedShinyMessageGlobal = new EmbedBuilder()
      .setDescription(
        `**[${pointBall}/${finalResult}]** :x: ${Author.globalName} falhou ao tentar capturar um Shiny ${pokemonName} usando uma ${ballName}.\n@everyone`
      )
      .setAuthor({
        name: `Shiny ${pokemonName}`,
        iconURL: avatarAuthor,
      })
      .setThumbnail(pokemonThumb)
      .setFooter({
        text: "As mensagens de conquistas exibidas são meramente ilustrativas e não correspondem a eventos reais ocorridos em qualquer jogo. Guild ARKHAM",
      })
      .setColor("Red");
  }

  return embedShinyMessageGlobal;
};
