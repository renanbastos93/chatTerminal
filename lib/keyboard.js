var read = require('readline');

var rl = read.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

var obj = {}

obj.line = function(line){
	rl.on('line',(chunk) => {
		line(chunk);
		rl.prompt();
	}).on('close', () => {
		process.exit(0);
	});
};

module.exports = obj;