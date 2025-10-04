import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import type { Interaction, ChatInputCommandInteraction, Message } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import type { Command, BotConfig } from './types';

// Get current directory for ES modules
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Import config
import config from './config.json' assert { type: 'json' };
const { clientId, guildId, botActivity }: BotConfig = config as BotConfig;

const botActivityType: string = botActivity.type.toUpperCase() || '';
const botActivityText: string = botActivity.text || '';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();
const commands: any[] = [];

async function loadCommands(): Promise<void> {
    const commandsPath: string = path.join(__dirname, 'slashCommands');
    const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath: string = path.join(commandsPath, file);
        const command = await import(filePath);
        const commandModule: Command = command.default || command;
        commands.push(commandModule.data.toJSON());
        client.commands.set(commandModule.data.name, commandModule);
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || '');

async function registerCommands(): Promise<void> {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error: any) {
        console.error(error);
    }
}

// Set up event listeners
client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command: Command | undefined = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction as ChatInputCommandInteraction);
    } catch (error: any) {
        console.error(error);
        await (interaction as ChatInputCommandInteraction).reply({ 
            content: 'There was an error while executing this command!', 
            ephemeral: true 
        });
    }
});

client.on('messageCreate', async (message: Message) => {
    if (message.content === "hello") {
        message.reply("Hello there!");
    }
});

client.on('ready', () => {
    if (client.user) {
        console.log(`${client.user.tag} is Ready!`);
        client.user.setPresence({ 
            activities: [{ name: botActivityText, type: botActivityType as any }], 
            status: 'dnd' 
        });
    }
});

async function startBot(): Promise<void> {
    await loadCommands();
    await registerCommands();
    await client.login(import.meta.env.TOKEN);
}

export default startBot;