import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, EmbedBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import config from '../config.json' assert { type: 'json' };
const { clientName } = config;

export default {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Give me a message and I will say it with Embed or Normal!')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('The Type of Say Message')
                .setRequired(true)
                .addChoices(
                    { name: 'NORMAL', value: 'NORMAL' },
                    { name: 'EMBED', value: 'EMBED' }
                ))
        .addStringOption(option => option.setName('message').setDescription('Say something...').setRequired(true)),
    async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<void> {
        const type: string | null = interaction.options.getString('type');
        const value: string | null = interaction.options.getString('message');

        if (!type || !value) {
            const embedError = new EmbedBuilder()
                .setTitle(`${client.user?.username || 'Bot'} - Say:`)
                .setDescription("You didn't specify a message!")
                .setColor(0xFF0000);

            await interaction.reply({ embeds: [embedError], ephemeral: true });
            return;
        }

        if (type === "EMBED") {
            const embed = new EmbedBuilder()
                .setDescription(value);

            await interaction.reply({ embeds: [embed] });
        } else if (type === "NORMAL") {
            await interaction.reply({ content: value });
        }
    },
};
