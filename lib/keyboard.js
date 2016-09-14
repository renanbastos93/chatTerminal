module.exports = (callback) => {
	process.stdin.on('readable', () => {
		let message = process.stdin.read();
		if(!message) return;
		return callback(message);
	});
};