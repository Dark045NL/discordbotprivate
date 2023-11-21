const firstMessage = require("./roleClaimMsg");

module.exports = (client) => {
	const channelId = "806293041849696276";

	const roles = {
		T90A: { name: "SRE team", ind: "Only for War thunder ingame members of the squadron EUA" },
		weabo_ree: { name: "Weeb" },
		EZ: { name: "Supremer-memer" },
		"🇪🇺": { name: "Europe" },
		"🇺🇸": { name: "North America" },
		"🇧🇷": { name: "South America" },
		"🇿🇦": { name: "Africa" },
		"🇹🇷": { name: "Middle East" },
		"🇨🇳": { name: "East Asia" },
		"🇦🇺": { name: "Oceania" },
		pepeJAM: { name: "DJ", ind: "For use of the music bot" },
	};

	const reactions = ["<:T90A:805072950431973396>", "<:weabo_ree:797533245751296062>", "<:EZ:668042791028260875>", "🇪🇺", "🇺🇸", "🇧🇷", "🇿🇦", "🇹🇷", "🇨🇳", "🇦🇺", "<:pepeJAM:662717706054795300>"];

	let emojiText = "Here you will be able to assign yourself some roles you might want. In case you want to remove them in the future, just remove the reaction to that emoji.\nAdd a reaction to claim a role:\n\n";
	let i = 0;
	for (const key in roles) {
		const role = roles[key];
		emojiText += `${reactions[i]} = ${role.name}`;
		if (role.ind) {
			emojiText += ` (${role.ind})`;
		}
		emojiText += "\n";
		i++;
	}
	firstMessage(client, channelId, emojiText, reactions);

	const handleReaction = (reaction, user, add) => {
		const filter = Object.keys(roles).find(element => element === reaction._emoji.name);
		if (filter == undefined) return;
		if (user.bot) return;

		const emoji = reaction._emoji.name;

		const { guild } = reaction.message;

		const roleName = roles[emoji].name;
		if (!roleName) {
			return;
		}

		const role = guild.roles.cache.find((role1) => role1.name === roleName);
		const member = guild.members.cache.find((member1) => member1.id === user.id);

		if (add) {
			member.roles.add(role);
		}
		else {
			member.roles.remove(role);
		}
	};

	client.on("messageReactionAdd", (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, true);
		}
	});

	client.on("messageReactionRemove", (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});
};