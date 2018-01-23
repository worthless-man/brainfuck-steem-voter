# brainfuck-steem-voter
Steem vote robot written in Brainfuck

1. Install node js
2. npm i steem
3. npm i brainfuck-javascript
4. Prepare memory
  4.1 node preparememory.js {your private posting steem key}
  4.2 Replace YOUR_PRIVATE_POSTING_KEY in robot.bf with the string you got on 4.1
  4.3 Repeat 4.1 and 4.2 with YOUR_NICKNAME in robot.bf
  4.4 node preparememory.js {your curator} curator
  4.5 Replace YOUR_CURATOR in robot.bf with the string you got on 4.4
5. node robot.js
