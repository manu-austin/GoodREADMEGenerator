const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

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

function generateHTML(answers) {
    return `
<!DOCTYPE html>
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
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
    .then(function(answers) {
        const html = generateHTML(answers);

        return writeFileAsync("index.html", html);
    })
    .then(function() {
        console.log("Successfully wrote to index.html");
    })
    .catch(function(err) {
        console.log(err);
    });