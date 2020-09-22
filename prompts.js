const inquirer = require('inquirer');
const style = require('./styling');
const consts = require('./consts');
inquirer.registerPrompt('selectLine', require('inquirer-select-line'));

let prefixSymbol = "number";

//////////////////////////
// ANCHOR Prompt Questions
//////////////////////////

const confirmQuestion = {
    type: "confirm", 
    name: "confirm",
    message: style.confirm("Is this correct? "),
    default: true
}

// listElements is important! ListPrompt() accesses and changes this for listQuestions.
let listElements = [];
const listQuestions = [
    {
        name: "Main",
        type: "list",
        message: style.textQuestion("Please configure: "),
        loop: false,
        pageSize: 16,
        choices: () => {
            let newChoices = [
                {
                    name: "ADD NEW",
                    value: "new"
                },
                {
                    name: "FINISH",
                    value: "finish"
                },
                {
                    name: "CHANGE PREFIX SYMBOL",
                    value: "prefixSymbol"
                },
                new inquirer.Separator(), // Separato
            ]
            for (let i = 0; i < listElements.length; i++) {
                newChoices.push(listElements[i]);
            }
            return newChoices;
        } 
    },
    {
        name: "New Line",
        type: "input",
        message: "Input new line: \n",
        when: (answers) => { // If the installation main value is new...
            if (answers["Main"] === "new") {
                return true;
            } else return false;
        }
    },
    {
        name: "Edit",
        type: "list",
        message: "How would you like to edit this line?",
        when: (answers) => { // If the user chose to edit a line...
            if (answers["Main"] !== "finish" &&
                answers["Main"] !== "new" &&
                answers["Main"] !== "prefixSymbol") {
                return true;
            } else return false;
        },
        choices: [
            {
                name: "Cancel",
                value: "cancel",
            },
            {
                name: "Edit Text",
                value: "text",
            },
            {
                name: "Change order",
                value: "order",
            },
            {
                name: "Delete",
                value: "delete",
            },
        ]
    },
    {
        name: "Edit - Text",
        type: "input",
        message: "Please change text: ",
        when: (answers) => { if (answers["Edit"] === "text") return true; }
    },
    {
        name: "Edit - Order",
        type: "selectLine",
        message: "Please change order: ",
        when: (answers) => { if (answers["Edit"] === "order") return true; },
        // placeholder: (answers) => answers["Main"],
        choices: (answers) => {
            // Take the element out of the new DISPLAY list to display for more accurate reordering
            let elementsToDisplay = [ ...listElements ];
            elementsToDisplay.splice(listElements.findIndex(element => element.value === answers["Main"]), 1);            
            // Get an array of names from the objects
            let listElementNames = elementsToDisplay.map(element => element.name);

            return listElementNames;
        },
    },
    {
        name: "Edit - Delete",
        type: "confirm",
        message: style.confirm("Are you sure you want to delete this line?"),
        when: (answers) => { if (answers["Edit"] === "delete") return true; }
    },
]

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
        name: "Installation",
        message: "Please list installation instructions",
    },
    ...listQuestions,
]

const usageQuestions = [
    {
        name: "Usage",
        message: style.textQuestion("Please input usage information: ")
    }
]

const currentFeaturesQuestions = []

const plannedFeaturesQuestions = []

const liscenseQuestions = []

const contributingQuestions = []

const testsQuestions = []

const contactQuestions = []


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
    return getRefTag("image") + `![${imageAlt}](${imageURL})` + br2;
}

const getDeployedLinkFormat = (...args) => {
    let deployedLink = args[0]["Deployed Link"];
    return getRefTag("deployedLink") + `### [Click here to launch this application](${deployedLink})` + br2;
}

const getLastUpdatedDateFormat = (...args) => {
    let lastUpdatedDate = args[0]["Updated Date"];
    return getRefTag(consts.tagify(consts.lastUpdateDateName)) + `### **Last Updated**: ${lastUpdatedDate}` + br2;
}

const getInstallationFormat = (list) => {
    return getListFormat("## Installation", consts.installationName, list);
}

const getUsageFormat = (list) => {
    return getListFormat("## Usage", consts.usageName, list);
}

const getCurrentFeaturesFormat = (...args) => {
    
}

const getPlannedFeaturesFormat = (...args) => {

}

const getLiscenseFormat = (...args) => {
    
}

const getContributingFormat = (...args) => {
    
}

const getTestsFormat = (...args) => {
    
}

const getContactFormat = (...args) => {
    
}

const getListFormat = (header, constName, list) => {
    let listFormatted = header;
    for (let i = 0; i < list.length; i++) {
        listFormatted = listFormatted + "\n" + list[i];
    }
    listFormatted = listFormatted + "\n";
    return getRefTag(consts.tagify(constName)) + listFormatted;
}

const getRefTag = (name) => {
    return `<a name="${name}"></a>\n`;
}

//////////////////////////
// ANCHOR Prompt Functions
//////////////////////////

function ListPrompt(name, format, isNumbered) {
    this.name = name;
    this.format = format;
    this.resetListElements = function () { 
        listElements = [] 
    };
    this.resetListElements();
    this.startPrompt = async function () {
        console.info(style.textH1(name))
        let answers = await inquirer.prompt(listQuestions);
        let mainAnswer = answers["Main"];
        
        // If the user chose to add a new line:
        if(mainAnswer === "new") { 
            let newLineAnswer = answers["New Line"];
            let newLine = {
                name: newLineAnswer,
                value: newLineAnswer,
            }
            // Put this at the end of the list
            listElements.push(newLine);
            // Put order numbers or bullet points on it
            updateOrderPrefixForListPrompt();
            // Then restart prompt
            style.consoleClear();
            return this.startPrompt();
        } 

        else if (mainAnswer === "prefixSymbol") {
            changeOrderSymbol();
            updateOrderPrefixForListPrompt();
            style.consoleClear();
            return this.startPrompt();
        }

        else if (mainAnswer === "finish") {
            let namesToFormat = listElements.map(element => element.name);
            this.resetListElements();
            return this.format(namesToFormat);
        }

        // EDITING A LINE:
        if(answers["Edit"]) {
            let editAnswer = answers["Edit"];
            let listObjectToEdit = listElements.find(
                element => element.value === mainAnswer);
            let listObjectToEditIndex = listElements.findIndex(
                element => element.value === mainAnswer);

            if(editAnswer === "cancel") { } // Do nothing on cancel

            else if(editAnswer === "delete") {
                // Delete at the index of the chosen list object
                if(answers["Edit - Delete"] === true) { 
                    listElements.splice(listObjectToEditIndex, 1);
                }
                updateOrderPrefixForListPrompt();
            }

            else if(editAnswer === "order") {
                let orderAnswer = answers["Edit - Order"];

                // Get Object that we are reordering, and remove it from the list
                let objectToReorder = listElements[listObjectToEditIndex];
                listElements.splice(listObjectToEditIndex, 1);

                /* NOTE Here is a small diagram I made to help myself figure out this algorithm.
                I thought it was neat, so I left it in! :)
                    0 1 2 3 4   | index
                    a b c d e   | element
                    0 1 2 3 4 5 | line
                    -------> take out c
                    0 1 2 3
                    a b d e
                    0 1 2 3 4 
                    -------> c to line 1. (it would splice into index 1)
                    0 1 2 3 4
                    a c b d e
                    0 1 2 3 4 5 */
                listElements.splice(orderAnswer, 0, objectToReorder);
                updateOrderPrefixForListPrompt();
            }
            
            else if(editAnswer === "text") {
                let textAnswer = answers["Edit - Text"];
                listObjectToEdit.value = textAnswer;
                updateOrderPrefixForListPrompt();
            }
            style.consoleClear();
            return this.startPrompt();
        }
    }
}

function updateOrderPrefixForListPrompt() {
    for(let i = 0; i < listElements.length; i++) {
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let thisElement = listElements[i];
        let prefix = "";
        if(prefixSymbol === "number") {
            prefix = `${i + 1}. `;
        } 
        else if (prefixSymbol === "alphabet") {
            prefix = `${alphabet[i]}. `;
        }
        else if (prefixSymbol === "bullet") {
            prefix = `• `;
        }
        else if (prefixSymbol === "dash") {
            prefix = `- `;
        }
        else if (prefixSymbol === "none") {
            PREFIX = ``;
        }
        thisElement.name = prefix + thisElement.value;
    }
}

function changeOrderSymbol() {
    switch(prefixSymbol) {
        case "number":
            prefixSymbol = "alphabet";
            break;
        case "alphabet":
            prefixSymbol = "bullet";
            break;
        case "bullet":
            prefixSymbol = "dash";
            break;
        case "dash":
            prefixSymbol = "none";
            break;
        case "none":
            prefixSymbol = "number";
            break;
    }
}

function Prompt(questions, format) {
    this.questions = questions;
    this.format = format;
    this.startPrompt = async function () {
        let answers = await inquirer.prompt(questions);

        // Get the confirm answer, check if it's right!. Restart if confirm is false!
        for (answer in answers) {
            console.info(answer + ": " + answers[answer]);
        }
        let confirmObject = await inquirer.prompt(confirmQuestion);
        if(confirmObject.confirm) {
            return this.format(answers);
        } else {
            return this.startPrompt();
        }
    }
}


// Prompt Exports

exports.image = new Prompt(imageQuestions, getImageFormat);
exports.deployedLink = new Prompt(deployedLinkQuestions, getDeployedLinkFormat);
exports.lastUpdatedDate = new Prompt(lastUpdatedDateQuestions, getLastUpdatedDateFormat);
exports.usage = new ListPrompt(consts.usageName, getUsageFormat);
exports.installation = new ListPrompt(consts.installationName, getInstallationFormat);
// exports.currentFeatures = 
// exports.plannedFeatures = 
// exports.liscense = 
// exports.contributing = 
// exports.tests = 
// exports.contact = 

// Special Case Prompt Exports

// installation.startPrompt = async function () { await installationPrompt(); }
// exports.installation = installation;