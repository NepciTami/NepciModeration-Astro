import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, EmbedBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import config from '../config.json' assert { type: 'json' };
const { clientName } = config;

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of Commands!')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Choose a Type of Commands.')
                .setRequired(true)
                .addChoices(
                    { name: 'Moderation', value: 'Moderation' },
                    { name: 'Images', value: 'Images' },
                    { name: 'Games', value: 'Games' },
                    { name: 'Informations', value: 'Informations' },
                    { name: 'General', value: 'General' },
                    { name: 'Utility', value: 'Utility' },
                    { name: 'Fun', value: 'Fun' }
                )),
    async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<void> {
        const type: string | null = interaction.options.getString('type');
        
        if (type === "Moderation") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - Moderation Commands:` })
                .setDescription("Currently Disabled.")
                .setColor(0xFF0000)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }

        if (type === "Images") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - Images Commands:` })
                .setDescription("Currently Disabled.")
                .setColor(0xFF0000)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }

        if (type === "Games") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - Games Commands:` })
                .setDescription("Currently Disabled.")
                .setColor(0xFF0000)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }

        if (type === "Informations") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - Info Commands:` })
                .setDescription("Currently Disabled.")
                .setColor(0xFF0000)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }

        if (type === "General") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - General Commands:` })
                .setDescription("`ping`")
                .setColor(0x00FF00)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }

        if (type === "Utility") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - Utility Commands:` })
                .setDescription("`embed_create`")
                .setColor(0x00FF00)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }

        if (type === "Fun") {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${clientName} - Fun Commands:` })
                .setDescription("`say`.")
                .setColor(0x00FF00)
                .setFooter({ text: "Slash Commands - /help" })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    },
};
