#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You need to provide a name for your react app');
  console.log('For example:');
  console.log('\tnpx create-boilerplate your-app-name');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = 'https://github.com/josprima/react-boilerplate';


try {
  fs.mkdirSync(projectPath);
} catch (error) {
  if (error.code === 'EEXIST') {
    console.log(`The file ${projectName} in current directory is already exists.`)
  } else {
    console.log(error);
  }

  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading Files...');
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);
    process.chdir(projectPath);

    console.log('Installing dependencies');
    execSync('npm install');

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');

    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });
    console.log('The instalation is done');
  } catch (error) {
    console.log(error);
  }
}

main();
