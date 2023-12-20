const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const BrokeTable = require('../../models/broketable');

module.exports = {

    name: 'broke-info',
    description: 'Consulta a informação da broke do Pokemon.',
    // devOnly: true,
    memberOnly: true,
    // testOnly: true,
    options: [
        {
            name: 'dex',
            description: 'Numero da Dex',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'pokemon',
            description: 'Nome do Pokemon.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    // deleted: Boolean,
  
    callback: async (client, interaction) => {

      const existDex = interaction.options.get('dex');
      const existName = interaction.options.get('pokemon');

      if(!existDex && !existName){
        interaction.reply('Nenhuma informação para consulta foi fornecida.');
        return;
      } else if (existDex){

        const pokemonDex = existDex.value;

        const query = {
          dex: pokemonDex,
        }; 

        try {
          const consulta = await BrokeTable.find(query);


          if(consulta.length === 0) {
            interaction.reply(`Nenhuma broke encontrada com a Dex #${pokemonDex}`);
            return;
          }

          if(consulta.length > 1){
            interaction.reply(`Existem duas ou mais brokes cadastradas com a Dex #${consulta[0].dex}.\n<@345350823485636609> Aconselho excluir a broke e recastrar.`);
            return;
          }

          const consDex = consulta[0].dex;
          const consName = consulta[0].pokemonName;
          const consBroke = consulta[0].pokemonBroke;
          const consAuthor = consulta[0].authorName;


        const embed = new EmbedBuilder()
        .setTitle(`#${consDex} ${consName}`)
        .setDescription(`Broke: ${consBroke}`)
        .addFields(
        {
            name: 'Cadastrado por:',
            value: consAuthor,
            inline: true,
        }
        );


          interaction.reply({ embeds: [embed] });


        } catch (error) {
          console.log(error);
          interaction.reply(`Erro ao consultar a Broke: ${error}`);
        }
      } else if(existName){

        const pokemonName = existName.value;

        const query = {
          pokemonName: { $regex: pokemonName, $options: 'i'},
        }; 

        try {
          const consulta = await BrokeTable.find(query);

          if(consulta.length === 0){
            interaction.reply(`Nenhuma broke encontrada com nome **${pokemonName}**`);
            return;
          }

          if(consulta.length > 1){
            let message = `Duas ou mais brokes encontradas com ${pokemonName}\n\n`;
            for(let i = 0; i < consulta.length; i++){
              message += `**${consulta[i].dex} ${consulta[i].pokemonName}**: ${consulta[i].pokemonBroke}. Por: ${consulta[i].authorName}\n`;
            }
            interaction.reply(message);
            return;
          }

          const consDex = consulta[0].dex;
          const consName = consulta[0].pokemonName;
          const consBroke = consulta[0].pokemonBroke;
          const consAuthor = consulta[0].authorName;

        const embed = new EmbedBuilder()
        .setTitle(`#${consDex} ${consName}`)
        .setDescription(`Broke: ${consBroke}`)
        .addFields(
        {
            name: 'Cadastrado por:',
            value: consAuthor,
            inline: true,
        }
        );


          interaction.reply({ embeds: [embed] });


        } catch (error) {
          console.log(error);
          interaction.reply(`Erro ao consultar a Broke: ${error}`);

      }
    };
      
    },
  };