const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, memberId } = require('./config.json');
const { PermissionsBitField } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours === 00 && minutes === 14) {
    const guild = client.guilds.cache.first();

    guild.members.fetch(memberId)
      .then(member => {
        if (!member) return console.error("Member not found");

        const generalChannel = guild.channels.cache.find(channel => channel.name === 'général');
        if (!generalChannel) return console.error('Channel not found');

        //Read names.json to extract the array called names
        const names = fs.readFileSync('./names.json');
        const namesJson = JSON.parse(names);

        //Get a random name from the array
        const randomName = namesJson.names[Math.floor(Math.random() * namesJson.names.length)];

        generalChannel.send(`Aujourd'hui, <@${memberId}> est de ${randomName.wing} !`);
        return member.setNickname(randomName.name);
      })
      .then(() => console.log("Pseudo modifié avec succès"))
      .catch(console.error);
  }
}, 60 * 100);

client.login(token);