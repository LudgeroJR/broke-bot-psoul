const { ApplicationCommandOptionType } = require('discord.js');
const BrokeTable = require('../../models/broketable');

module.exports = {

    name: 'broke-delete',
    description: 'Deleta a broke do Pokemon.',
    devOnly: true,
    // memberOnly: true,
    // testOnly: true,
    options: [
        {
            name: 'dex',
            description: 'Numero da Dex',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    // deleted: Boolean,
  
    callback: async (client, interaction) => {

      const pokemonDex = interaction.options.get('dex').value;


      try {
        let query = {
            dex: pokemonDex,
          };

        let broke = await BrokeTable.find(query);
          if (broke.length !== 0){

            for(let i = 0; i < broke.length; i++){
              await broke[i].deleteOne().catch((e) => {
                interaction.reply(`Erro ao deletar dados no banco: ${e}`);
                return;
              });
            };

            interaction.reply(`Registro com Dex #${pokemonDex} deletado com sucesso.`);
            return;
          } else {
            interaction.reply(`Nenhuma broke encontrada com a Dex #${pokemonDex}`);
          };

      } catch (error) {
        console.log(`Erro: ${error}`);
      };
      
    },
  };