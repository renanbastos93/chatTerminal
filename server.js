var net = require('net');

var connections = [];
var broadcast = (message, origin) => {
	connections.forEach((connection) => {
		if(connection === origin) return;
		connection.write(message);
	});
};

var send = (message, origin) => {
	let command = message.toString();
	if(command.indexOf('/nickname') === 0){
		var nickname = command.replace('/nickname', '');
		broadcast(origin.nickname + ' is now ' + nickname);
		origin.nickname = nickname;
		return;
	};
	broadcast(origin.nickname + ' > ' + message, origin);
};

var end = (origin) => {
	broadcast(origin.nickname + ' has left', origin);
	connections.splice(connections.indexOf(origin), 1);
};

net.createServer((connection) => {
	connections.push(connection);
	connection.write("Seja bem vindo!");
	connection.on('data', (message) => send(message, connection));
	connection.on('end', () => end(connection));
}).listen(3000);
