import { SlashCommandBuilder, EmbedBuilder, Client } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('members_count')
        .setDescription('Display the Members Count of This Server!'),
    async execute(client: Client, interaction: CommandInteraction): Promise<void> {
        if (!interaction.guild) {
            await interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} - Members Count:`)
            .setDescription(`There are **${interaction.guild.memberCount}** Members on this Server!`)
            .setColor(0x00FF00);

        await interaction.reply({ embeds: [embed] });
    },
};
