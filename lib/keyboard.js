var read = require('readline');

var rl = read.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = function(line){
	rl.on('line',(chunk)=>{
		line(chunk);
	});
};