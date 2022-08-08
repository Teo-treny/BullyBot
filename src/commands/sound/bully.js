const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bully')
        .setDescription('A chaque fois que la personne ciblée parle, le bot lui coupera la parole')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('La personne que vous souhaitez harceler')
                .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        // Get the guild, member, voiceChannel and the target
        const guild = client.guilds.cache.get(interaction.guild.id)
        const member = guild.members.cache.get(interaction.user.id);
        const voiceChannel= member.voice.channel;
        const target = interaction.options.getMember('user');

        // Makes the bot connect to the user's voice channel
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        // Creating the audio player
        const player = new createAudioPlayer();
        const ressource = createAudioResource(path.join(__dirname, 'yabiyabado.mp3'));

        var state = true;

        // player.play(ressource);
        connection.subscribe(player);

        connection.receiver.speaking.on('start', (userId) => {
            if (userId == target.id) {
                // on joue un son
                if (state) {
                    player.play(ressource)
                    state = false;
                }
                else
                    player.unpause()
            }
        });

        connection.receiver.speaking.on('end', (userId) => {
            if (userId == target.id) {
                // on met en pause le son
                player.pause();
            }
        });

        await interaction.editReply({
            content: `Je vais bully cette personne ${target}`
        });
    },
};