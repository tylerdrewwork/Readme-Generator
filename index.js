const fs = require("fs");
const inquirer = require('inquirer');
const util = require('util');
const clic = require('cli-color');

const consts = require('./consts');
const prompts = require("./prompts");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

async function startPrompt() {
    let optionsSections = [];

    await inquirer
        .prompt([
            {
                name: "sections",
                type: "checkbox",
                message: "What sections would you like to include in your README?",
                choices: [
                    new inquirer.Separator("== Headers =="),
                    clic.red(consts.imageName), consts.deployedLinkName, consts.lastUpdateDateName, consts.tableOfContentsName,
                    new inquirer.Separator("== Details =="),
                    consts.installationName, consts.usageName, consts.currentFeaturesName, consts.plannedFeaturesName,
                    new inquirer.Separator("== About =="),
                    consts.liscenseName, consts.contributingName, consts.testsName, consts.questionsName
                ],
                loop: true
            }
        ])
        .then( (answers) => {
            handleSectionCreation(answers.sections);
        })
        .catch ((err) => {
            console.error("ERROR! || ", err);
        }) 
}

async function handleSectionCreation(sections){
    let formattedSectionsToDisplay = [];
    
    function addSection(section) {
        formattedSectionsToDisplay.push(section);
    }

    for(sectionName in sections) {
        let thisSectionName = sections[sectionName];

        switch(thisSectionName) {
            case consts.imageName:
                addSection(await prompts.image.startPrompt());
                break;
            case consts.deployedLinkName:
                addSection(await prompts.deployedLink.startPrompt());
                break;
            case consts.lastUpdateDateName:
                addSection(await prompts.lastUpdatedDate.startPrompt());
                break;
            case consts.tableOfContentsName:
                // Add Table Of Contents
                break;
            case consts.installationName:
                addSection(await prompts.installation.startPrompt());
                break;
            case consts.usageName:
                break;
            case consts.currentFeaturesName:
                break;
            case consts.plannedFeaturesName:
                break;
            case consts.liscenseName:
                break;
            case consts.contributingName:
                break;
            case consts.testsName:
                break;
            case consts.questionsName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
        }
    }

    writeToFile(formattedSectionsToDisplay);
}

function writeToFile(formattedSectionsToDisplay) {
    // Clear file
    writeFileAsync("./README.md", "");

    for (formattedSection in formattedSectionsToDisplay) {
        appendFileAsync("./README.md", formattedSectionsToDisplay[formattedSection]);
    };
}

startPrompt();