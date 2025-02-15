import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent // Ensure the bot can read message content
    ],
});

const btn = new ButtonBuilder()
    .setCustomId('Whats the ip?')
    .setLabel('Ask powerkits what the ips are and info about that server!')
    .setStyle(ButtonStyle.Primary);

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", async (message) => {
    console.log('Received message:', message.content);

    if (!message.author.bot && message.content === 'Whats the ip?') {
        console.log('Message content matched');
        const row = new ActionRowBuilder().addComponents(btn);
        try {
            await message.author.send({
                content: 'Push the stupid ahh button',
                components: [row]
            });
            console.log('Message sent to user');
        } catch (error) {
            console.error('Error sending message to user:', error);
        }
    } else {
        console.log('Message content did not match or message is from a bot');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.customId === 'Whats the ip?') {
        await interaction.reply({
            content: 'The ip is Lexerbox.minehut.gg Lexerbox is a server of Lexicuno, Itzplots is a server of itzivano',
            ephemeral: true
        });
    }
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});