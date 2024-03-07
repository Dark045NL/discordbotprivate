//const Discord = require("discord.js");

//module.exports = {
//	name: "sre",
//	description: "Display help about SRE.",
//
//	async execute(message, args, client) {
//		const icon = "https://static.warthunder.ru/i/landings/heliplay/wt_logo_classic_redstripe.png";
//		const embed = new Discord.MessageEmbed()
//			.setTitle("SRE FAQ!")
//			.setThumbnail(icon)
//			.setDescription(`Q : **What is SRE?**
//          A : SRE is Squadron Realistic Event. It is an  8v8 squadron vs squadron fight where everyone only has 1 spawn.
//          
//          Q : **What BR is SRE?**
//          A : The BR is between 10.7 to 3.7 and changes every week.look at the pinned message in #sre-chat to see the current BR.
//            
//           Q : **What can I bring?**
//            A : You can bring anything at or below the BR limit, a team can have a maximum of 4 planes from the start of the game.
//            
//            Q : **When does SRE usually start?**
//            A : SRE usually starts around 7-8pm CET and ends at 11 pm.`);
//
//		const channel = await client.channels.fetch("692817571417948240");
//
//		if (message.channel != channel) {
//			await message.reply("Please look in <#692817571417948240> for a small FAQ about what sre is. You can also call this FAQ again with the <sre command.");
//		}
//
//		await channel.send(`Hello <@${message.author.id}>. Below you can see a short FAQ about SRE. If you still have any questions, feel free to ask the other members of squadron.`);
//		await channel.send({ embed: embed });
//	},
//};