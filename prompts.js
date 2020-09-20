const inquirer = require('inquirer');
const consts = require('./consts');

// FIXME Not currently working
// exports.confirmPrompt = (message, promptToConfirm) => {
//     console.log(`Verify: "${message}"`);
//     inquirer.prompt([
//         {
//             name: "confirmPrompt",
//             message: "Is the above correct?",
//             type: 'confirm'
//         }
//     ]).then((answers) => {
//         console.log("confirm prompt answer: ", answers["confirmPrompt"]);
//         let answer = answers["confirmPrompt"];
//         if(answers["confirmPrompt"] === true) {
//             return;
//         } else {
//             promptToConfirm();
//         }
//     });
// }

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
        name: "imageURL",
        message: "Please input the URL or path of your display image: "
    },
    {
        name: "imageAlt",
        message: "Please input alt text for your image: "
    },
    { ...confirmPrompt }
]

const deployedLinkQuestions = [
    {
        name: "deployedLink",
        message: "Please input the URL of your deployed application: "
    }
]

const lastUpdatedDateQuestions = [
    {
        name: "updatedDate",
        message: "Please input the date this project was last updated: "
    }
]

//////////////////////////
// ANCHOR Prompt Functions
//////////////////////////

/* NOTE: efficiency/readability upgrade!
- I changed the code here to reduce from 8 lines of code for EACH prompt
 that was created to *2* lines of code for each prompt.
- Before I reworked this, each prompt was it's own async function, taking up 8 lines of code...
 I decided to take a risk in the complexity of my knowledge to make my code more DRY (scary!)
- For the rework, I created a new constructor (Prompt), that takes in questions and desired format.
 now, the getFormat functions take in arguments and return the desired function using rest operators! :D
 All that I need to do in index.js is call this new object and start the prompt!
 Awesome!!! :D
*/
const getImageFormat = (...args) => {
    let imageAlt = args[0]["imageAlt"];
    let imageURL = args[0]["imageURL"];
    return `![${imageAlt}](${imageURL})` + "\n\n";
}

function Prompt(questions, format) {
    this.questions = questions;
    this.format = format;
    this.startPrompt = async function () {
        let {confirm, ...answers} = await inquirer.prompt(questions);
        if(confirm) {
            return this.format(answers);
        } else {
            return this.startPrompt();
        }
    }
}

let image = new Prompt(imageQuestions, getImageFormat);
exports.image = image;

const imagePrompt = async() => {
    let {confirm, ...answers} = await inquirer.prompt(imageQuestions);
    if(confirm) {
        return getImageFormat(answers.imageURL, answers.imageAlt);
    } else {
        return imagePrompt();
    }
}

exports.imagePrompt = imagePrompt;

const deployedLinkPrompt = async() => {
    let {confirm, ...answers} = await inquirer.prompt(deployedLinkQuestions);
    if(confirm) {
        return get
    }
}

exports.updatedDate = () => inquirer.prompt([

]);

exports.tableOfContents = async() => {
    inquirer.prompt([
        {
            name: "",
            message: "",
        }
    ])
}