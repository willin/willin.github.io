const path = require('path');
const { writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { github, codewars } = require('./lib');

(async () => {
  const ghResult = await github().then(data => JSON.stringify(data, null, 2));
  writeFileSync(path.resolve(__dirname, '../assets/cache/github.js'), `export default ${ghResult}`, 'utf-8');
  const cwResult = await codewars().then(data => JSON.stringify(data, null, 2));
  writeFileSync(path.resolve(__dirname, '../assets/cache/codewars.js'), `export default ${cwResult}`, 'utf-8');
  execSync('npm run lint');
})();
