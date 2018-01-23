var brainfuck = require('brainfuck-javascript');
var fs = require('fs');

const program = fs.readFileSync('./' + process.argv[2], 'utf8');

const steem = require('steem');
steem.api.setOptions({ url: 'https://api.steemit.com' });
steem.api.streamOperations(function (err, ops) {
                           if(err)return console.warn(err)
                           opsfilter(ops)
                           });

opsfilter = function(d){
    var type = d[0], o = d[1];
    if(type === 'vote')
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
            steem.broadcast.vote(command[1], command[2], command[3], command[4], Number(command[5]), function(err, result){console.log(err, result);});
            console.log(text);
        }
    }
}
