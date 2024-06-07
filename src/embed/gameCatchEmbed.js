const { EmbedBuilder } = require("discord.js");
const _ = require("lodash");

module.exports = (pokemonObject) => {
  //const pokemonId = pokemonObject.id;
  const pokemonName = _.startCase(_.toLower(pokemonObject.name));
  const pokemonThumb = pokemonObject.thumb;
  const isShiny = pokemonObject.shiny;
  var embed;

  if (!isShiny) {
    embed = new EmbedBuilder()
      .setTitle(`${pokemonName}`)
      .setDescription(
        `Um ${pokemonName} apareceu. Infelizmente ele não é shiny, vamos deixar ele seguir seu caminho.`
      )
      .setThumbnail(pokemonThumb)
      .setFooter({
        text: "Continue tentando até encontrar o raríssimo Pokemon Shiny. Não desista.",
      });
  } else {
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

  return embed;
};