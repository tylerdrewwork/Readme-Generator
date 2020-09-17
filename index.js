const fs = require("fs");
const inquirer = require('inquirer');
const consts = require('./consts');

function startPrompt() {
    let optionsSections = [];

    inquirer
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

function handleSectionCreation(sections){
    let finishedText = "";

    for(sectionName in sections) {
        let thisSectionName = sections[sectionName];

        switch(thisSectionName) {
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
            case consts.imageName:
                break;
            case consts.imageName:
                break;
            case consts.imageName:
                break;
        }
    }
}

function fillSectionWithInfo(section) {
    inquirer.prompt([

    ])
}

startPrompt();