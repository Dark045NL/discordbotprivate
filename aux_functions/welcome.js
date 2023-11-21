const Discord = require("discord.js");

module.exports = client => {
	client.on("guildMemberAdd", member => {
		if (member.guild.id != "604724957565681667") return;
		const servericon = member.guild.iconURL();

		const embed1 = new Discord.MessageEmbed()
			.setTitle("Welcome to EUA!")
			.setThumbnail(servericon)
			.setDescription("We would like to know if you are here to join the in game squadron European Army!\nPlease react accordingly!\n");
		const reactions1 = ["👍", "👎"];

		const embed2 = new Discord.MessageEmbed()
			.setTitle("In Game Name")
			.setThumbnail(servericon)
			.setDescription("We now would like to know your in game name so we can process your application more easily!\nPlease enter your in game name below.");

		const embed3 = new Discord.MessageEmbed()
			.setTitle("All Set!")
			.setThumbnail(servericon)
			.setDescription("Now you are all set! Welcome to our server, we hope you have a good time here!");
		member.send({ embed:embed1 }).then((msg) =>{
			for (const i in reactions1) {
				msg.react(reactions1[i]);
			}
			const filter1 = (reaction, user) => {
				return ["👍", "👎"].includes(reaction.emoji.name) && !user.bot;
			};
			const collector1 = msg.createReactionCollector(filter1, {
				max: 1,
				time: 500000
			});
			collector1.on("end", async (collected, reason) => {
				if (reason === "time") {
					member.send("Unfortunately the survey has expired, please contact the command members in the server for them to add your roles.");
				}
				else {
					// Grab the first reaction in the array
					const userReaction = collected.array()[0];
					// Grab the name of the reaction (which is the emoji itself)
					const emoji = userReaction._emoji.name;

					// Handle accordingly
					if (emoji === "👍") {
						try{
							await member.send({ embed:embed2 }).then(() => {
								const filter = (msn) => !msn.author.bot;
								const options = {
									max: 1,
									time: 500000
								};
								return msg.channel.awaitMessages(filter, options);
							}).then(async (collected2) => {
								const inGameName = collected2.array()[0].content;
								const channel = await client.channels.fetch("612646902831382538");
								await member.setNickname(inGameName);
								channel.send(`**${member.user.username}** is looking to join the squadron with the in game name *${inGameName}*`);
							}).then(async () =>{
								await member.send({ embed:embed3 });
							});
						}
						catch(er) {
							console.log(er);
						}
					}
					else if (emoji === "👎") {
						await member.send({ embed:embed3 });
						const channel = await client.channels.fetch("612646902831382538");
						channel.send(`**${member.user.username}** is only looking to join as a guest`);
					}
					else {
						// This should be filtered out, but handle it just in case
						await msg.reply(`I dont understand ${emoji}...`);
					}
				}
			});
		}).catch ((e) => {
			console.log(e);
		});
	});
};