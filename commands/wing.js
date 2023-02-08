const fs = require('node:fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wing')
		.setDescription('Renames you with a random name, according to a political wing.'),
	async execute(interaction) {
        //Read names.json to extract the array called names
        const names = fs.readFileSync('./names.json');
        const namesJson = JSON.parse(names);

        //Get a random name from the array
        const randomName = namesJson.names[Math.floor(Math.random() * namesJson.names.length)];

        const originalNickName = interaction.member.nickname;

        //Give the random name to the user
        await interaction.member.setNickname(randomName.name);

        await interaction.reply(`Aujourd'hui, ${originalNickName} est de ${randomName.wing} et incarnera donc... ${randomName.name} !`);
	},
};