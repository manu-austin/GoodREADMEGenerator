const inquirer = require("inquirer");
const fs = require("fs");
// const path = require('path');
const util = require("util");

// const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please provide a description of your project"
        },
        {
            type: "input",
            name: "installationInstructions",
            message: "What are the steps for the installation of the application?"
        },
        {
            type: "input",
            name: "usageInformation",
            message: "Please explain how to use the application"
        },
        {
            type: "input",
            name: "contributionGuidelines",
            message: "Please give guidelines for contributing to the project"
        },
        {
            type: "input",
            name: "testInstructions",
            message: "How can user test this application?"
        },
        {
            type: "list",
            name: "licenseList",
            message: "Please pick a license for this application from the list below",
            choices: [
                "Apache License 2.0",
                "BSD 3-Clause 'New' or 'Revised' license",
                "BSD 2-Clause 'Simplified' or 'FreeBSD' license",
                "GNU General Public License (GPL)",
                "GNU Library or 'Lesser' General Public License (LGPL)",
                "MIT license",
                "Mozilla Public License 2.0",
                "Common Development and Distribution License",
                "Eclipse Public License version 2.0",
            ]
        },
        {
            type: "input",
            name: "gitHubName",
            message: "What is your gitHub username?"
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is your email address?"
        },

    ]);
}

function generateMd(answers) { return `
  # ${answers.title} 
  ${answers.description}
  \n* [Installation](#Installation)
  \n* [Instructions](#Instructions)
  \n* [License](#License)
  \n* [Contributors](#Contributors)
  \n* [Author](#Author)
  \n* [Tests](#Tests)
  ## Installation
  ${answers.installationInstructions}
  ## Instructions
  ${answers.usageInformation}
  \`\`\`
  ${answers.testInstructions}
  \`\`\`
  ## License 
  This project is licensed under the ${answers.licenseList}
  ## Author 
  \n**${answers.gitHubName}**
  \nEmail: ${answers.emailAddress}
  ` }


promptUser()
    .then(function(answers) {
        const Md = generateMd({...answers }); //... give an object with no definite number of arguments

        return fs.writeFileSync("README.md", Md);
    })
    .then(function() {
        console.log("Successfully wrote to README.md");
    })
    .catch(function(err) {
        console.log(err);
    });


// var writeResult = fs.writeFileSync(path.join(__dirname, '../GoodREADMeGenerator', 'readMe.md'), result)