#!/usr/bin/env node
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');

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
  console.log(chalk.cyan.bold('\n🤖 Specify AI Switcher\n'));

  // Check if git worktree is clean
  if (shell.which('git')) {
    const gitStatus = shell.exec('git status --porcelain', { silent: true });
    if (gitStatus.code === 0 && gitStatus.stdout.trim() !== '') {
      console.log(chalk.red('\n❌ Error: Git worktree is not clean.'));
      console.log(chalk.yellow('Please commit or stash your changes before running this tool.\n'));
      process.exit(1);
    }
  }

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Switch AI (Clean .specify & Re-init)', value: 'switch' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]);

  if (action === 'exit') {
    console.log('Bye!');
    process.exit(0);
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

  if (action === 'switch') {
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
    const cmd = `specify init --here --script ${scriptType} --ai ${selectedAI} --no-git --force`;
    console.log(chalk.gray(`2. Running: ${cmd}`));
    if (shell.exec(cmd).code !== 0) {
      console.log(chalk.red('Error executing specify init'));
      process.exit(1);
    }

    // 3. Restore constitution
    console.log(chalk.gray('3. Restoring constitution...'));
    if (shell.exec('git restore .specify/memory/constitution.md').code !== 0) {
      console.log(chalk.yellow('Warning: Could not restore constitution (maybe git is not initialized or file missing)'));
    }

    console.log(chalk.green('\n✅ Done!'));

  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
