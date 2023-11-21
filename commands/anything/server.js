const Discord = require("discord.js");

module.exports = {
	name: "server",
	description: "Display info about this server.",

	execute(message) {
		const servericon = message.guild.iconURL();
		// console.log(servericon);
		const embed = new Discord.MessageEmbed()
			.setThumbnail(servericon)
			.setDescription(`
				Server name: ${message.guild.name}
      			Total members: ${message.guild.memberCount}
      			ServerBoost: ${message.guild.premiumSubscriptionCount}
      			Created on: ${message.guild.createdAt}
      			Region: ${message.guild.region}
				  Owner: ogoidmatos#5328 `);
		message.channel.send({ embed: embed });
	}
};