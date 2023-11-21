const fs = require("fs");
module.exports = {
	name: "ban",
	description: "Tag a member and ban them.",
	async execute(message, args) {
		if (message.member.roles.cache.has("680430162449530923") || message.member.roles.cache.has("611302931056033805") || message.member.roles.cache.has("680430627585130520")) {
			if (!message.mentions.users.size) {
				return message.reply("you need to tag a user in order to ban them!");
			}
			const dmFile = require("../../aux_functions/dm.js");
			const member = message.mentions.members.first();

			args.splice(0, 1);
			const reason = args.join(" ");

			// eslint-disable-next-line prefer-const
			let err = false;
			try{
				await dmFile.msg(message, "bann", reason);
				await member.ban({ reason });
			}
			catch(e) {
				console.log(e);
				message.channel.send("It was not possible to ban " + member.displayName);
				err = true;
			}

			if(!err) {
				message.channel.send(member.displayName + " has been successfully banned");
				const data = `Username: ${member.user.username}\nID: ${member.id}\n`;
				fs.writeFile("ban_list.txt", data, { flag:"a" }, (err) => {
					if (err) throw err;
				});
			}
		}
		else {
			message.reply("Who the fuck are you? git gut");
		}
	},
};