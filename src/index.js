require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");
const SendCurrentRanking = require("./utils/ranking/sendCurrentRanking");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to Broke DB.");

    // Calcula o tempo até a próxima hora cheia
    const now = new Date();
    const delayUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 -
      now.getSeconds() * 1000 -
      now.getMilliseconds();

    // Aguarda até a próxima hora cheia e então executa a função a cada hora
    setTimeout(() => {
      SendCurrentRanking(client);
      setInterval(() => SendCurrentRanking(client), 60 * 60 * 1000);
    }, delayUntilNextHour);

    eventHandler(client);
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

//eventHandler(client);
