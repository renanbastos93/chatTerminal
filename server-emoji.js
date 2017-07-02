var net = require('net');

var connections = [];
var FUNC = {};
var emoji = {
        modhappy: ': )',
        modsad: ': (',
        modexcited: '*-*'
    };


FUNC.getFirstWord = function(message) {
    var mood = message.split(' ');

    if(!mood.length) {
        return '';
    }

    return mood[0];
};


FUNC.getEmoji = function(attr){
    var mood = emoji[attr];

    if(!mood) {
        mood = '';
    }

    return mood;
};


net.createServer((connection) => {
    connections.push(connection);

	connection.on('data', (message) => {
        var strMessage = message.toString();
        var moodAttr = FUNC.getFirstWord(strMessage);
        var mood = FUNC.getEmoji(moodAttr);
        
        connection.write(mood + ' ' + strMessage);
    });
	// connection.on('end', () => end(connection));
}).listen(2112);
