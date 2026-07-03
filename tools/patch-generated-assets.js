'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, '_config.yml');
const config = fs.readFileSync(configPath, 'utf8');
const rootMatch = config.match(/^root:\s*['"]?([^'"\s#]+)/m);
const root = rootMatch ? rootMatch[1] : '/';
const normalizedRoot = root.endsWith('/') ? root : `${root}/`;

['scripts/app-built.js', 'scripts/search.js'].forEach(file => {
  const target = path.join(projectRoot, 'public', file);

  if (!fs.existsSync(target)) {
    throw new Error(`Generated asset not found: ${file}`);
  }

  const content = fs.readFileSync(target, 'utf8');
  const patched = content.replace(/fetch\(['"]\/content\.json['"]/g, `fetch('${normalizedRoot}content.json'`);

  fs.writeFileSync(target, patched);
});
