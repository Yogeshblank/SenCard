//const { Client, Intents } = require('discord.js');
const { clientId, guildId, token } = require("./config.json");
const fs = require("fs");
const path = require("path");

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
.readdirSync(commandsPath)
.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

function generateRandom() {
	let random = Math.floor(Math.random() * 100 + 1);
	let reminder = random % 20;
	console.log(random);
	if (random == 100 || random == 1) console.log("Legendary");
	else if (reminder == 19) {
		console.log("rare");
	} else if (reminder !== 19) {
		reminder = random % 10;
		if (reminder == 9) console.log("common");
	} else console.log("eggs");
}

client.login(token);
