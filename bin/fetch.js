// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const { writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { v0, github } = require('./lib');

(async () => {
  const v0Result = await v0().then((data) => JSON.stringify(data, null, 2));
  writeFileSync(path.resolve(__dirname, '../assets/cache/v0.js'), `export default ${v0Result}`, 'utf-8');
  const ghResult = await github().then((data) => JSON.stringify(data, null, 2));
  writeFileSync(path.resolve(__dirname, '../assets/cache/github.js'), `export default ${ghResult}`, 'utf-8');
  execSync('npm run lint');
})();
