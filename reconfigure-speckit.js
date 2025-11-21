#!/usr/bin/env node
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');
const packageJson = require('./package.json');
const { execSync } = require('child_process');

const AI_TOOLS = [
  'claude',
  'gemini',
  'copilot',
  'cursor-agent',
  'qwen',
  'opencode',
  'codex',
  'windsurf',
  'kilocode',
  'auggie',
  'codebuddy',
  'amp',
  'shai',
  'q'
];

async function main() {
  if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log(packageJson.version);
    process.exit(0);
  }

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(chalk.cyan('\nSpeckit Initializr\n'));
    console.log('Usage: speckit-initializr [options]');
    console.log('\nOptions:');
    console.log('  -v, --version Show version number');
    console.log('  -h, --help    Show this help message');
    console.log('  --force       Skip git worktree clean check');
    console.log('\nDescription:');
    console.log('  Quickly reconfigure Speckit environment with different AI assistants.');
    process.exit(0);
  }

  // Check available CLI (prefer uvx)
  const hasUvx = shell.which('uvx');
  const hasSpecify = shell.which('specify');

  if (!hasUvx && !hasSpecify) {
    console.log(chalk.red('\n❌ Error: Neither uvx nor specify CLI found.'));
    console.log(
      chalk.yellow(
        'Please install uvx (preferred) or specify CLI first: https://github.com/github/spec-kit/\n'
      )
    );
    process.exit(1);
  }

  // Check if constitution exists before we start wiping things
  const constitutionPath = '.specify/memory/constitution.md';
  const shouldRestoreConstitution = shell.test('-f', constitutionPath);

  // Check if git worktree is clean
  if (shell.which('git') && !process.argv.includes('--force')) {
    try {
      const stdout = execSync('git status --porcelain', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      if (stdout.trim() !== '') {
        console.log(chalk.red('\n❌ Error: Git worktree is not clean.'));
        console.log(chalk.yellow('Please commit or stash your changes before running this tool.\n'));
        process.exit(1);
      }
    } catch (e) {
      // git status failed, ignore or handle
    }
  }

  // Detect default script based on OS
  const defaultScript = process.platform === 'win32' ? 'ps' : 'sh';

  const { scriptType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'scriptType',
      message: 'Select Script Type:',
      choices: [
        { name: 'PowerShell (ps) - Recommended for Windows', value: 'ps' },
        { name: 'Bash (sh) - Recommended for Linux/Mac', value: 'sh' }
      ],
      default: defaultScript
    }
  ]);

  const { selectedAI } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedAI',
      message: 'Select AI Assistant:',
      choices: AI_TOOLS,
      pageSize: 15
    }
  ]);

  console.log(chalk.yellow(`\n🚀 Switching to ${selectedAI} with ${scriptType} script...\n`));

  // 1. Remove .specify folder
  console.log(chalk.gray('1. Removing .specify folder...'));
  if (shell.test('-d', '.specify')) {
    shell.rm('-rf', '.specify');
  }

  // 2. Rebuild template
  const specifyBaseCommand = hasUvx
    ? 'uvx --from git+https://github.com/github/spec-kit.git specify init'
    : 'specify init';
  const cmd = `${specifyBaseCommand} --here --script ${scriptType} --ai ${selectedAI} --no-git --force --ignore-agent-tools`;
  console.log(chalk.gray(`2. Running: ${cmd}`));
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.log(chalk.red('Error executing specify init'));
    process.exit(1);
  }

  // 3. Restore constitution
  if (shouldRestoreConstitution) {
    console.log(chalk.gray('3. Restoring constitution...'));
    try {
      execSync('git restore .specify/memory/constitution.md', { stdio: 'ignore' });
    } catch (e) {
      // console.log(chalk.yellow('Warning: Could not restore constitution (maybe git is not initialized or file missing)'));
    }
  }

  console.log(chalk.green('\n✅ Done!'));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
