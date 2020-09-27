const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require('path');


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

var result = (`
  # ${answer.title} 
  ${answer.description}
  \n* [Installation](#Installation)
  \n* [Instructions](#Instructions)
  \n* [License](#License)
  \n* [Contributors](#Contributors)
  \n* [Author](#Author)
  \n* [Tests](#Tests)
  ## Installation
  ${answer.installationInstructions}
  ## Instructions
  ${answer.usageInformation}
  \`\`\`
  ${answer.testInstructions}
  \`\`\`
  ## License 
  This project is licensed under the ${answer.licenseList}
  ## Author 
  \n**${answer.gitHubName}**
  \nEmail: ${answer.emailAddress}
  `)


promptUser()
    .then(function(answers) {
        const result = generateMd(answers);

        return writeResult("index.html", html);
    })
    .then(function() {
        console.log("Successfully wrote to index.html");
    })
    .catch(function(err) {
        console.log(err);
    });


var writeResult = fs.writeFileSync(path.join(__dirname, '../GoodREADMeGenerator', 'readMe.md'), result)