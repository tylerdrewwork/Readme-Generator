const fs = require("fs");
const inquirer = require('inquirer');

function startPrompt() {

    inquirer
        .prompt([
            {
                name: "index",
                type: "checkbox",
                message: "What sections would you like to include in your README?",
                choices: [
                    'Last Updated Date', 'Table Of Contents', 'Installation',
                    'Usage', 'Liscense', 'Contributing', 'Tests', 'Questions'
                ]
            }
        ])

}

startPrompt();