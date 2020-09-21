const fs = require("fs");
const inquirer = require('inquirer');
const { pathToFileURL } = require("url");
const util = require('util');

const consts = require('./consts');
const prompts = require("./prompts");
const style = require('./styling');

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

async function startPrompt() {
    let optionsSections = [];
    style.consoleClear();

    console.info(style.textH1("Welcome to the ultimate readme generator!") + "\n\n");

    await inquirer
        .prompt([
            {
                name: "sections",
                type: "checkbox",
                message: style.textQuestion("What sections would you like to include in your README?") + "\n",
                choices: [
                    new inquirer.Separator(style.textH2("== Headers ==")),
                    consts.imageName, consts.deployedLinkName, consts.lastUpdateDateName, consts.tableOfContentsName,
                    new inquirer.Separator(style.textH2("== Details ==")),
                    consts.installationName, consts.usageName, consts.currentFeaturesName, consts.plannedFeaturesName,
                    new inquirer.Separator(style.textH2("== About ==")),
                    consts.liscenseName, consts.contributingName, consts.testsName, consts.questionsName
                ],
                loop: true,
                pageSize: 16,
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
        style.consoleClear();

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

    LogEndOfApplication();
}

function LogEndOfApplication() {
    style.consoleClear();
    console.info("Thank you for using The Ultimate README Generator! \n");
    console.info("You can find your README here: \n" + pathToFileURL("./README.md"));
    console.info("\n\nCreated by Tyler D Smith, Sept 2020. (www.github.com/sakiskid)");
}

startPrompt();