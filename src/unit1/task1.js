const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const result = reverse(line);
  console.log(result);
});

const reverse = (input) => {
  if (!input) {
    return;
  }

  const arr = [];
  for (let i = 0; i < input.length; i++) {
    arr.push(input.charAt([input.length - i - 1]));
  }
  return arr.join('');
};
