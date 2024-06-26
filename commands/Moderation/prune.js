module.exports = {
	name: "prune",
	description: "Prune up to 99 messages.",
	execute(message, args) {
		if (message.member.roles.cache.has("680430162449530923") || message.member.roles.cache.has("611302931056033805") || message.member.roles.cache.has("680430627585130520")) {
			const amount = parseInt(args[0]) + 1;

			if (isNaN(amount)) {
				return message.reply("that doesn't seem to be a valid number.");
			}
			else if (amount <= 1 || amount > 100) {
				return message.reply("you need to input a number between 1 and 99.");
			}

			message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				message.channel.send("there was an error trying to prune messages in this channel!");
			});
		}
		else {
			message.reply("Who the fuck are you? git gut");
		}
	},
};