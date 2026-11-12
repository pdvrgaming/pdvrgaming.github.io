import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const tmpDeployDir = path.resolve('.deploy_tmp');

if (!fs.existsSync(distDir)) {
  console.error('dist/ folder not found. Run npm run build first.');
  process.exit(1);
}

console.log('Preparing GitHub Pages deployment to origin/main...');
if (fs.existsSync(tmpDeployDir)) {
  fs.rmSync(tmpDeployDir, { recursive: true, force: true });
}
fs.cpSync(distDir, tmpDeployDir, { recursive: true });
fs.writeFileSync(path.join(tmpDeployDir, '.nojekyll'), '');
if (fs.existsSync('README.md')) {
  fs.copyFileSync('README.md', path.join(tmpDeployDir, 'README.md'));
}

const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
execSync('git init -b main', { cwd: tmpDeployDir, stdio: 'inherit' });
execSync(`git remote add origin ${remoteUrl}`, { cwd: tmpDeployDir, stdio: 'inherit' });
execSync('git add -A', { cwd: tmpDeployDir, stdio: 'inherit' });
execSync('git commit -m "deploy: production build to https://pdvrgaming.github.io/"', { cwd: tmpDeployDir, stdio: 'inherit' });
execSync('git push -f origin main', { cwd: tmpDeployDir, stdio: 'inherit' });

fs.rmSync(tmpDeployDir, { recursive: true, force: true });
console.log('Deployed dist/ cleanly to origin/main!');
