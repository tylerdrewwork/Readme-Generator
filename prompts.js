const inquirer = require('inquirer');
const consts = require('./consts');

//////////////////////////
// ANCHOR Prompt Questions
//////////////////////////

const confirmPrompt = {
    type: "confirm", 
    name: "confirm",
    message: "Is this correct? ",
    default: true
}

const imageQuestions = [
    {
        name: "Image URL",
        message: "Please input the URL or path of your display image: "
    },
    {
        name: "Image Alt",
        message: "Please input alt text for your image: "
    }
]

const deployedLinkQuestions = [
    {
        name: "Deployed Link",
        message: "Please input the URL of your deployed application: "
    }
]

const lastUpdatedDateQuestions = [
    {
        name: "Updated Date",
        message: "Please input the date this project was last updated: "
    }
]

const installationQuestions = [
    {
        name: "Installation Instructions",
        type: "list",
        message: "Please list any installation instructions: ",
        choices: function (answers) {

        }
    }
]

//////////////////////////
// ANCHOR Prompt Functions
//////////////////////////

/* NOTE: efficiency/readability upgrade!
-- Reduced EACH prompt code from 10+ lines to 1(!!) line of code each -- without sacrificing readability.

- I changed the code here to reduce from 10+ lines of code for EACH prompt
 that was created to *2* lines of code for each prompt.
 You can see this in the exports for these prompts.

- Before I reworked this, each prompt was it's own async function, taking up 8 lines of code...
 I decided to take a risk in the complexity of my knowledge to make my code more DRY (scary!)
 
- For the rework, I created a new constructor (Prompt), that takes in questions and desired format.
 now, the getFormat functions take in arguments and return the desired function using rest operators! :D
 All that I need to do in index.js is call this new object and start the prompt!
 Awesome!!! :D
*/

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

const getInstallationFormat = (...args) => {

}

function Prompt(questions, format) {
    this.questions = questions;
    this.format = format;
    this.startPrompt = async function () {
        // Get the answers for the actual prompt
        let answers = await inquirer.prompt(questions);
        for (answer in answers) {
            console.info(answer + ": " + answers[answer]);
        }
        // Get the confirm answer. Restart if confirm is false!
        let confirmObject = await inquirer.prompt(confirmPrompt);
        if(confirmObject.confirm) {
            return this.format(answers);
        } else {
            return this.startPrompt();
        }
    }
}

exports.image = new Prompt(imageQuestions, getImageFormat);
exports.deployedLink = new Prompt(deployedLinkQuestions, getDeployedLinkFormat);
exports.lastUpdatedDate = new Prompt(lastUpdatedDateQuestions, getLastUpdatedDateFormat);
exports.installation = new Prompt(installationQuestions, getInstallationFormat);