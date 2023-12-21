const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {

    name: 'calcula-ball',
    description: 'Sugere quantidade de balls para montar sua broke.',
    // devOnly: true,
    memberOnly: true,
    // testOnly: true,
    options: [
        {
            name: 'pontos',
            description: 'Pontuação da broke.',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        { 
            name: '4x',
            description: 'Quantidade desejada de ball 4x em porcentagem.',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: '3x',
            description: 'Quantidade desejada de ball 3x em porcentagem.',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: '2x',
            description: 'Quantidade desejada de ball 2x em porcentagem.',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    // deleted: Boolean,
  
    callback: async (client, interaction) => {

      const pontosTotais = interaction.options.get('pontos');
      const porcBall4x = interaction.options.get('4x');
      const porcBall3x = interaction.options.get('3x');
      const porcBall2x = interaction.options.get('2x');

      let pontosRestantes = pontosTotais.value;
      let message = "";
      let pontos = 0;

      if (porcBall4x.value !== 0){
        let ball4x = Math.ceil((pontosRestantes * (porcBall4x.value / 100)) / 4);

        pontos = ball4x * 4;
        message += `Ball4x: ${ball4x} - Pontos: ${pontos}` ;
        pontosRestantes -= ball4x * 4;
      }

      if (porcBall3x.value !== 0){
        let ball3x = Math.ceil((pontosRestantes * (porcBall3x.value / 100)) / 3);

        pontos = ball3x * 3;
        message += `\nUltraball: ${ball3x} - Pontos: ${pontos}`;
        pontosRestantes -= ball3x * 3;
      }

      if (porcBall2x.value !== 0){
        let ball2x = Math.ceil((pontosRestantes * (porcBall2x.value / 100)) / 2);

        pontos = ball2x * 2;
        message += `\nGreatball: ${ball2x} - Pontos: ${pontos}`;
        pontosRestantes -= ball2x * 2;
      }

      if (pontosRestantes !== 0){
        message += `\nPokeball: ${pontosRestantes} - Pontos: ${pontosRestantes}`;
      }

      message += '\n\nA Guild ARK invoca o **BUFF AH PUFF** para abençoar sua broke.';

      const embed = new EmbedBuilder()
        .setTitle(`Sugestão de balls para ${pontosTotais.value} pontos.`)
        .setDescription(message);

    interaction.reply({ embeds: [embed] });

    // interaction.reply('Teste');

    },
  };