const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sdv')
		.setDescription('Renames you with a cool name, in honor of SDV.'),
	async execute(interaction) {
        const originalUserName = interaction.member.user.username ? interaction.member.user.username : "Anonyme";
        await interaction.member.setNickname("🖕 Fuck SDV Paris 🖕");
        await interaction.reply(`Aujourd'hui, ${originalUserName} ne choisit pas de camp et incarnera seulement... 🖕 Fuck SDV Paris 🖕!`);
	},
};