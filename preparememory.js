var brainfuck = require('brainfuck-javascript');

function main(){
    text = brainfuck('+[,.--------------------------------]', process.argv[2] + ' ');
    bftext = '';
    for(let i in text)
    {
        for(j = 0; j<text[i]; j++)
        {
            bftext += '+';
        }
        if(process.argv[3]=='curator')
        {
            bftext += '>+>+>+';
        }
        bftext += '>';
    }
    if(!process.argv[3])bftext = bftext.slice(0, -33);
    if(process.argv[3] == 'curator')bftext = bftext.slice(0, -46);
    console.log(bftext);
}
main();
