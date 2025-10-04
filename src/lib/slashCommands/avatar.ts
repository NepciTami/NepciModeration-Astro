import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, EmbedBuilder, User } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar URL of the selected user, or your own avatar!')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User | null = interaction.options.getUser('target');

        if (user) {
            const embed1 = new EmbedBuilder()
                .setTitle(`${user.username}'s Avatar:`)
                .setDescription(`User: ${user}\nLink: [Click Here](${user.displayAvatarURL({})}).`)
                .setImage(user.displayAvatarURL({}))
                .setColor(0x0099FF);
            
            await interaction.reply({ embeds: [embed1] });
        } else {
            const embed2 = new EmbedBuilder()
                .setTitle("Your Account Avatar:")
                .setDescription(`Link: [Click Here](${interaction.user.displayAvatarURL({})}).`)
                .setImage(interaction.user.displayAvatarURL({}))
                .setColor(0x0099FF);

            await interaction.reply({ embeds: [embed2] });
        }
    },
};
