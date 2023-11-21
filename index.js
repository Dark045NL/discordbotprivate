const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const welcome = require("./aux_functions/welcome.js");
const roleClaim = require("./aux_functions/roleClaim.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands_folder = fs.readdirSync("./commands");

for (const folder of commands_folder) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


client.once("ready", () => {
	console.log("Running!");
	// adds presence
	client.user.setActivity("The ban hammer", { type: "PLAYING" })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);
	roleClaim(client);
});

welcome(client);

client.on("message", message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	const regex = />\\*\/*w|▽\/*\\*</;
	if (message.content.includes("dinner") && message.author.id == "516881362473451521") message.reply("<:bonk:780037036127813632>");
	if (regex.exec(message.content)) message.reply("<:bonk:780037036127813632>");
	if (message.content.toLowerCase().includes("what is sre") || message.content.toLowerCase().includes("what's sre") || message.content.toLowerCase().includes("whats sre")) {
		client.commands.get("sre").execute(message, args, client);
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});

client.login(token);