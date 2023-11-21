const Discord = require("discord.js");
module.exports = {
	name: "user-info",
	description: "Display info about yourself.",
	execute(message) {
		const avatar = message.author.avatarURL();
		const embed = new Discord.MessageEmbed()
			.setThumbnail(avatar)
			.setDescription(`
				Name: ${message.author.username}
				Tag: ${message.author.tag}
				Created on: ${message.author.createdAt}
				`);
		message.channel.send({ embed: embed });
	},
};