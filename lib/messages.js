module.exports = (message) => {
	if(!message) return;
	if(message.indexOf('/clear') === 0){
		process.stdout.write('\x1Bc');
		console.log("Chat is clean");
		return;
	};
	if(message.indexOf('/nickname') === 0){
		var nickname = message.replace('/nickname', '');
		return nickname;
	};
};