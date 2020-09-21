const inquirer = require('inquirer');
const style = require('./styling');
inquirer.registerPrompt('selectLine', require('inquirer-select-line'));

//////////////////////////
// ANCHOR Prompt Questions
//////////////////////////

const confirmQuestion = {
    type: "confirm", 
    name: "confirm",
    message: style.confirm("Is this correct? "),
    default: true
}

const imageQuestions = [
    {
        name: "Image URL",
        message: style.textQuestion("Please input the URL or path of your display image: \n")
    },
    {
        name: "Image Alt",
        message: style.textQuestion("Please input alt text for your image: ")
    }
]

const deployedLinkQuestions = [
    {
        name: "Deployed Link",
        message: style.textQuestion("Please input the URL of your deployed application: ")
    }
]

const lastUpdatedDateQuestions = [
    {
        name: "Updated Date",
        message: style.textQuestion("Please input the date this project was last updated: ")
    }
]

const installationQuestions = [
    {
        name: "Installation Main",
        type: "list",
        message: style.textQuestion("Installation Instructions: "),
        choices: [
            {
                name: "ADD NEW",
                value: "new"
            },
            {
                name: "FINISH",
                value: "done"
            }
        ]
    },
    {
        name: "Installation New Line",
        type: "input",
        message: "Input new instruction: \n",
        when: (answers) => {
            if (answers["Installation Main"] === "new") {
                return true;
            } else return false;
        }
    }
]


/* NOTE: efficiency/readability upgrade!
-- Reduced EACH prompt code from 10+ lines to 1(!!) line of code each -- without sacrificing readability.

- You can see this in the exports for these prompts.

- Before I reworked this, each prompt was it's own async function, taking up 8 lines of code...
I decided to take a risk in the complexity of my knowledge to make my code more DRY (scary!)

- For the rework, I created a new constructor (Prompt), that takes in questions and desired format.
now, the getFormat functions take in arguments and return the desired function using rest operators! :D
All that I need to do in index.js is call this new object and start the prompt!
Awesome!!! :D
*/

//////////////////////////
// ANCHOR Prompt Formats
//////////////////////////

const br1 = "\n";
const br2 = "\n\n";

const getImageFormat = (...args) => {
    let imageAlt = args[0]["Image URL"];
    let imageURL = args[0]["Image Alt"];
    return `![${imageAlt}](${imageURL})` + br2;
}

const getDeployedLinkFormat = (...args) => {
    let deployedLink = args[0]["Deployed Link"];
    return `### [Click here to launch this application](${deployedLink})` + br2;
}

const getLastUpdatedDateFormat = (...args) => {
    let lastUpdatedDate = args[0]["Updated Date"];
    return `### **Last Updated**: ${lastUpdatedDate}` + br1;
}

//////////////////////////
// ANCHOR Prompt Functions
//////////////////////////

async function installationPrompt() {
    let answers = await inquirer.prompt(installationQuestions)
    if(answers["Installation New Line"]) {
        console.info(answers["Installation New Line"]);
        
        await installationPrompt();
    }
    // .then((answers) => {
    //     if(answers["Installation New Line"]) {
    //         console.info(answers["Installation New Line"]);
            
    //         installationPrompt();
    //     }
    // });
}

const getInstallationFormat = (...args) => {
    
}

function Prompt(questions, format) {
    this.questions = questions;
    this.format = format;
    this.startPrompt = async function () {
        let answers = await inquirer.prompt(questions);
        confirmPrompt(answers);
    }
}

async function confirmPrompt(answers) {
        // Get the confirm answer, check if it's right!. Restart if confirm is false!
        for (answer in answers) {
            console.info(answer + ": " + answers[answer]);
        }
        let confirmObject = await inquirer.prompt(confirmPrompt);
        if(confirmObject.confirm) {
            return this.format(answers);
        } else {
            return this.startPrompt();
        }
}

exports.image = new Prompt(imageQuestions, getImageFormat);
exports.deployedLink = new Prompt(deployedLinkQuestions, getDeployedLinkFormat);
exports.lastUpdatedDate = new Prompt(lastUpdatedDateQuestions, getLastUpdatedDateFormat);

let installation = new Prompt(installationQuestions, getInstallationFormat);
installation.startPrompt = async function () { await installationPrompt(); }
exports.installation = installation;