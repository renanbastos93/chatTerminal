var net = require('net');
var read = require('./lib/keyboard');
var msgVerify = require('./lib/messages');


var client = net.connect(3000);


client.on('data', (message) => console.log( message.toString() ));


client.on('connect', () => client.write('entered room'));


client.on('end', () => process.exit());


read.line((message) => {
	msgVerify(message);
	client.write(message);
});
