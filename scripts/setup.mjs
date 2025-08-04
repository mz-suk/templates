import fs from 'fs/promises';
import path from 'path';
import { createInterface } from 'readline';

// Helper function to ask questions in the command line
function askQuestion(rl, query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`
🚀 Welcome to the project setup script!
This will help you configure your new project based on this template.
`);

  try {
    // --- Get project details from user ---
    const newProjectName = await askQuestion(rl, 'What is the name of your new project? (e.g., my-awesome-app) ');
    const newProjectDescription = await askQuestion(rl, 'What is the description of your project? ');

    // --- Update package.json ---
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    // Update fields
    packageJson.name = newProjectName.trim() || packageJson.name;
    packageJson.description = newProjectDescription.trim() || packageJson.description;
    packageJson.version = '0.1.0'; // Reset version

    // Remove the setup script from package.json scripts
    delete packageJson.scripts.setup;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('✅ package.json has been updated.');

    // --- Update README.md ---
    const readmePath = path.resolve(process.cwd(), 'README.md');
    let readmeContent = await fs.readFile(readmePath, 'utf-8');
    readmeContent = readmeContent.replace(/^# .*/, `# ${newProjectName.trim()}`);
    await fs.writeFile(readmePath, readmeContent);
    console.log('✅ README.md has been updated.');

    // --- Self-destruct ---
    const selfDestructAnswer = await askQuestion(rl, 'Do you want to delete this setup script and its directory? (y/n) ');
    if (selfDestructAnswer.toLowerCase() === 'y') {
      const scriptPath = new URL(import.meta.url).pathname;
      const scriptDir = path.dirname(scriptPath);
      
      await fs.unlink(scriptPath);
      
      // Check if directory is empty and remove it
      const files = await fs.readdir(scriptDir);
      if (files.length === 0) {
        await fs.rmdir(scriptDir);
      }
      console.log('✅ Setup script and directory have been deleted.');
    }
  } catch (error) {
    console.error('\n❌ An error occurred during setup:', error);
  } finally {
    rl.close();
    console.log('\n🎉 Project setup complete! Happy coding!');
  }
}

main();
