module.exports = {
	name: "mute",
	description: "Mutes an individual by removing all their roles and adding mute",
	async execute(message, args) {
		if (message.member.roles.cache.has("680430162449530923") || message.member.roles.cache.has("611302931056033805") || message.member.roles.cache.has("680430627585130520")) {
			if (!message.mentions.users.size) {
				return message.reply("you need to tag a user in order to mute them!");
			}
			const dmFile = require("../../aux_functions/dm.js");
			const member = message.mentions.members.first();

			args.splice(0, 1);
			const reason = args.join(" ");

			// eslint-disable-next-line prefer-const
			let err = false;
			try{
				await dmFile.msg(message, "mut", reason);
				await member.roles.set(["612657605428379649"]);
			}
			catch(e) {
				console.log(e);
				message.channel.send("It was not possible to mute " + member.displayName);
				err = true;
			}
			if(!err) {
				message.channel.send(member.displayName + " has been successfully muted");
			}
		}
		else {
			message.reply("Who the fuck are you? git gut");
		}
	},

};