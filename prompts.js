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
            console.log(this.format(answers));
        } else {
            return this.startPrompt();
        }
    }
}

let imagePrompt2 = new Prompt(imageQuestions, getImageFormat);
imagePrompt2.startPrompt();

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