var net = require('net');
var read = require('./lib/keyboard');
var msgVerify = require('./lib/messages');


var SERVER = {};
var connections = [];
var client = net.connect(2112);
var currentConnection;


SERVER.broadcast = (message, origin) => {
	connections.forEach((connection) => {
		if(connection === origin) return;
		connection.write(message);
    });
};

SERVER.send = (message, origin) => {
	let command = message.toString();
	
    if(command.indexOf('/nickname') === 0){
		var nickname = command.replace('/nickname', '');
		
        SERVER.broadcast(origin.nickname + ' is now ' + nickname);
		
        origin.nickname = nickname;

		return;
	};
	
    SERVER.broadcast(origin.nickname + ' > ' + message, origin);
};

SERVER.end = (origin) => {
	SERVER.broadcast(origin.nickname + ' has left', origin);
	connections.splice(connections.indexOf(origin), 1);
};


net.createServer((connection) => {
	connections.push(connection);
	
    connection.write('Wellcome');
	
    connection.on('data', (message) => {
    	//mod\w+(\s|\?|\!|\.)
        client.write(message);
        // client.on('data', (message) => SERVER.send(message, connection) );
        //SERVER.send(message, connection)
    });
	
    connection.on('end', () => SERVER.end(connection));
	
    client.on('data', (message) => SERVER.send(message, connection) );

    read.line((chunk) => {
		if(!chunk) return;
		
        SERVER.broadcast('admin > ' + chunk, connection);
	});
}).listen(3000);