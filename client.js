var net = require('net');

var client = net.connect(3000);

client.on('data', (message) => console.log(message.toString()));

client.on('connect', () => client.write("Entrou na sala"));

client.on('end', () => process.exit());

process.stdin.on('readable', () => {
	let message = process.stdin.read();
	if(!message) return;
	if(message.indexOf('/clear') === 0){
		//console.log('\x1Bc');
		process.stdout.write('\x1Bc');
		console.log("Chat is clean");
		return;
	};
	client.write(message.toString().replace(/\n/, ''));
});