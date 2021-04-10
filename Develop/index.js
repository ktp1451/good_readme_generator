// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMd = require("./utils/generateMarkdown");

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);
const questions = [
    {
      type: 'input',
      message: 'What is your project title?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is your project description?',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Is there any special installation instructions?',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'Is there any usage information?',
      name: 'usage',
    },
    {
        type: 'input',
        message: 'What are the contribution guidelines?',
        name: 'contributions',
    },
    {
        type: 'input',
        message: 'What are the test instructions?',
        name: 'tests',
    },
    {
        type: "list",
        message: "What license should your project have?",
        name: "license",
        choices: 
        [
            "MIT",
            "Unlicense",
            "Apache 2.0",
            "GNU v3",
            "BSD 3-Clause",
            "Mozilla Public License 2.0"
        ]
    },
    {
      type: 'input',
      message: 'Enter your GitHub Username',
      name: 'username',
    },
    {
      type: 'input',
      message: 'What is your email address?',
      name: 'email',
    },
  ]
  const promptUser = () => {
    return inquirer.prompt(questions);
};

const generateHTML = (answers) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.title}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.username}</li>
      <li class="list-group-item">LinkedIn: ${answers.email}</li>
    </ul>
  </div>
</div>
</body>
</html>`;

const generateReadMe = (answers) => `
# ${answers.title}

## Description
${answers.description}
<br>
## Installation
${answers.installation}
<br>
## Usage
${answers.usage}
<br>
## Contributions
${answers.contributions}
<br>
## Tests
${answers.tests}
<br>
## License
${answers.license}
<br>
## Questions
${answers.username}, ${answers.email}
`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => {
        console.log(answers);
        writeFileAsync('ReadMe.md', generateReadMe(answers))
    })
    .then(() => console.log('Successfully wrote to ReadMe.md'))
    .catch((err) => console.error(err));
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// Function call to initialize app
init();