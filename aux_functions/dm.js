module.exports = {
	name:"dm",
	msg: async function(message, type, data) {
		let msg = `You have been ${type}ed`;
		if (data) {
			msg = msg.concat(` for ${data}`);
		}
		await message.mentions.members.first().send(msg);
	},

};