const inquirer = require('inquirer');

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

//////////////////////////
// ANCHOR Prompt Functions
//////////////////////////

const imagePrompt = async() => {
    let {confirm, ...answers} = await inquirer.prompt(imageQuestions);
    if(confirm) {
        return getImageFormat(answers.imageURL, answers.imageAlt);
    } else {
        imagePrompt();
    }
}

const getImageFormat = (imageURL, imageAlt) => {
    return `![${imageAlt}](${imageURL})` + "\n\n";
}

exports.imagePrompt = imagePrompt;

/*exports.deployedLink = () => inquirer.prompt([
    {
        name: "deployedLink",
        message: "Please input the URL of your deployed application: "
    }
]);

exports.updatedDate = () => inquirer.prompt([
    {
        name: "updatedDate",
        message: "Please input the date this project was last updated: "
    }
]);

exports.tableOfContents = async() => {
    inquirer.prompt([
        {
            name: "",
            message: "",
        }
    ])
}*/