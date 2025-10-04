import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, EmbedBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import config from '../config.json' assert { type: 'json' };
const { clientName } = config;

export default {
    data: new SlashCommandBuilder()
        .setName('embed_create')
        .setDescription('The Best Embed Creator Ever!')
        .addStringOption(option => option.setName('author').setDescription('Author of Embed'))
        .addStringOption(option => option.setName('title').setDescription('Title of Embed'))
        .addStringOption(option => option.setName('description').setDescription('Description of Embed'))
        .addStringOption(option => option.setName('footer').setDescription('Footer of Embed'))
        .addStringOption(option => option.setName('color').setDescription('Color of Embed (Use RED, YELLOW, BLUE... etc)')),
    async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<void> {

        const author: string | null = interaction.options.getString('author');
        const title: string | null = interaction.options.getString('title');
        const description: string | null = interaction.options.getString('description');
        const footer: string | null = interaction.options.getString('footer');
        const color: string | null = interaction.options.getString('color');

        // Convert color strings to hex values
        const colorMap: { [key: string]: number } = {
            'RED': 0xFF0000,
            'GREEN': 0x00FF00,
            'BLUE': 0x0099FF,
            'YELLOW': 0xFFFF00,
            'ORANGE': 0xFFA500,
            'PURPLE': 0x800080,
            'PINK': 0xFFC0CB,
            'BLACK': 0x000000,
            'WHITE': 0xFFFFFF,
            'GREY': 0x808080,
            'GRAY': 0x808080,
            'BLURPLE': 0x5865F2,
            'GREYPLE': 0x99AAB5
        };

        const embedColor = color ? (colorMap[color.toUpperCase()] || 0x5865F2) : 0x5865F2;

        const embed = new EmbedBuilder()
            .setAuthor(author ? { name: author } : null)
            .setTitle(title || "")
            .setDescription(description || "")
            .setFooter(footer ? { text: footer } : null)
            .setColor(embedColor);

        await interaction.reply({ embeds: [embed] });
    },
};
