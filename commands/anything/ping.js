module.exports = {
	name: "ping",
	description: "Ping!",
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send("Pong.");
	},
};