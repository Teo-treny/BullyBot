const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('debully')
        .setDescription('Arrete de bully'),
    
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        const guild = client.guilds.cache.get(interaction.guild.id)
        const member = guild.members.cache.get(interaction.user.id);
        const voiceChannel= member.voice.channel;

        const connection = getVoiceConnection(guild.id);

        connection.disconnect();

        await interaction.editReply({
            content: `Je lui lache sa veste`,
        });

        return 0;
    },
};