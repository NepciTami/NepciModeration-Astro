import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(client: Client, interaction: CommandInteraction): Promise<void> {
        await interaction.reply(`Pong! ${client.ws.ping}ms`);
    },
};
