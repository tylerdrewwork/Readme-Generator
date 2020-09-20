const fs = require("fs");
const inquirer = require('inquirer');
const util = require('util');
const consts = require('./consts');
const prompts = require("./prompts");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

async function startPrompt() {
    let optionsSections = [];

    await inquirer
        .prompt([
            {
                name: "sectionsPrimary",
                type: "checkbox",
                message: "What sections would you like to include in your README?",
                choices: [
                    consts.imageName, consts.linkName, consts.updatedDateName, consts.tableOfContentsName
                ]
            },
            {
                name: "sectionsSecondary",
                type: "checkbox",
                message: "Sections continued...",
                choices: [
                    consts.installationName, consts.usageName, consts.currentFeaturesName, consts.plannedFeaturesName
                ]
            },
            {
                name: "sectionsTertiary",
                type: "checkbox",
                message: "Sections continued...",
                choices: [
                    consts.liscenseName, consts.contributingName, consts.testsName, consts.questionsName
                ]
            }
        ])
        .then( (answers) => {
            // Put all of the answers together
            for (let answer in answers) {
                optionsSections = optionsSections.concat(answers[answer]);
            }
        })
        .then( () => {
            handleSectionCreation(optionsSections)
        })
        .catch ((err) => {
            console.error("ERROR! || ", err);
        }) 
}

async function handleSectionCreation(sections){
    let formattedSectionsToDisplay = [];

    for(sectionName in sections) {
        let thisSectionName = sections[sectionName];

        switch(thisSectionName) {
            case consts.imageName:
                formattedSectionsToDisplay.push(await prompts.image.startPrompt());
                break;
            case consts.linkName:
                // formattedSectionsToDisplay.push(await prompts.)
                break;
            case consts.updatedDateName:
                // await prompts.
                break;
            case consts.tableOfContentsName:
                break;
            case consts.installationName:
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