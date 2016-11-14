var net = require('net');
var read = require('./lib/keyboard');
var msgVerify = require('./lib/messages');

var client = net.connect(3000);

client.on('data', (message) => console.log(message.toString()));

client.on('connect', () => client.write("Entrou na sala"));

client.on('end', () => process.exit());

read((message) => {
	client.write(message);
});