const fs = require("node:fs");
require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { loadCommands, loadEvents } = require("./functions/loaders.js");

console.log(process.env.TOKEN);
console.log(process.env.MEMBER_ID);
console.log(process.env.CLIENT_ID);
console.log(process.env.GUILD_ID); //

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

loadCommands(client);
loadEvents(client);

setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours === 9 && minutes === 20) {
    const guild = client.guilds.cache.first();

    guild.members
      .fetch(process.env.MEMBER_ID)
      .then((member) => {
        if (!member) return console.error("Member not found");

        const generalChannel = guild.channels.cache.find(
          (channel) => channel.name === "général"
        );
        if (!generalChannel) return console.error("Channel not found");

        //Read names.json to extract the array called names
        const names = fs.readFileSync("./names.json");
        const namesJson = JSON.parse(names);

        //Get a random name from the array
        const randomName =
          namesJson.names[Math.floor(Math.random() * namesJson.names.length)];

        generalChannel.send(
          `Aujourd'hui, Guilhem est de ${randomName.wing} et incarnera donc... ${randomName.name} !`
        );
        return member.setNickname(randomName.name);
      })
      .then(() => console.log("Pseudo modifié avec succès"))
      .catch(console.error);
  }
}, 60 * 1000);

client.login(process.env.TOKEN);
