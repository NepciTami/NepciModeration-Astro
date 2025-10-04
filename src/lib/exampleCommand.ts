// Loads The Package for Slash Builder:
import { SlashCommandBuilder, Client } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

// Loads the Module:
export default {
  // Creating a new Slash Command + Registering it:
    data: new SlashCommandBuilder()
    // Name of Slash Command:
        .setName('hello')
    // Description of Slash Command:
        .setDescription('Hello Command!'),
  // After loading the configurations of the new slash command, Now we can start our command development:
    async execute(client: Client, interaction: CommandInteraction): Promise<void> {
    // This code below is replying to the user who used the command:
        await interaction.reply(`Hello! What's Up?`);
    },
};

// Note:
// 1• The texts with a double slash (//) Are help for you!!
// 2• The TS file is not supported with JavaScript, So do not use TS files (TypeScript) in the Folder "slashCommands".
