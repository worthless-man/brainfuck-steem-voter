var WebSocket = require('ws');
var socket = new WebSocket('wss://api.golos.cf');
var golos = require('golos-js');
golos.config.set('websocket','wss://api.golos.cf');
var brainfuck = require('brainfuck-javascript');
var fs = require('fs');

var program = fs.readFileSync('./' + process.argv[2], 'utf8');

socket.onopen = function(event) {
    
    socket.send(JSON.stringify({
                               id: 1,
                               method: 'call',
                               'params': ['database_api', 'set_block_applied_callback', [0], ]
                               }));
    
    socket.onmessage = function(raw) {
        
        var data = JSON.parse(raw.data)
        if (data.method === 'notice' && data.params) {
            
            var hex = data.params[1][0].previous.slice(0, 8)
            var height = parseInt(hex, 16)
            
            socket.send(JSON.stringify({
                                       id: 2,
                                       method: 'call',
                                       params: ['database_api', 'get_ops_in_block', [height, 'false']]
                                       }));
            
        } else if (data.id === 2) {
            opsfilter(data.result)
        }
    }
}

opsfilter = function(d){
    for (var i = 0; i < d.length; ++i) {
        var b = d[i].block, tx = d[i].trx_id, t = d[i].timestamp, type = d[i].op[0],pre='', o = d[i].op[1];
        if(type === 'vote' && o.voter == 'xui')
        {
            var stream = '';
            for(let property in o)
            {
                stream += o[property] + ' ';
            }
            text = brainfuck.text(program, stream);
            command = text.split(' ');
            if(command[0] == 'vote')
            {
                golos.broadcast.vote(command[1], command[2], command[3], command[4], Number(command[5]), function(err, result){console.log(err, result);});
                console.log(text);
            }
        }
    }
}
