import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Collection } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export interface BotConfig {
    botActivity: {
        type: string;
        text: string;
    };
    clientId: string;
    guildId: string;
    clientName: string;
}

export interface Command {
    data: SlashCommandBuilder;
    execute: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Extend the Discord.js Client interface
declare module 'discord.js' {
    interface Client {
        commands: Collection<string, Command>;
    }
}
