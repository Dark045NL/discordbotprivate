module.exports = {
	name: "kick",
	description: "Tag a member and kick them.",
	async execute(message, args) {
		if (message.member.roles.cache.has("680430162449530923") || message.member.roles.cache.has("611302931056033805") || message.member.roles.cache.has("680430627585130520")) {

			if (!message.mentions.users.size) {
				return message.reply("you need to tag a user in order to kick them!");
			}

			const dmFile = require("../../aux_functions/dm.js");
			const member = message.mentions.members.first();

			args.splice(0, 1);
			const reason = args.join(" ");

			// eslint-disable-next-line prefer-const
			let err = false;
			try{
				await dmFile.msg(message, "kick", reason);
				await member.kick(reason);
			}
			catch(e) {
				console.log(e);
				message.channel.send("It was not possible to kick " + member.displayName);
				err = true;
			}
			if(!err) {
				message.channel.send(member.displayName + " has been successfully kicked");
			}
		}
		else {
			message.reply("Who the fuck are you? git gut");
		}
	},
};