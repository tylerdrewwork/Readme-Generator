const inquirer = require('inquirer');

// FIXME Not currently working
exports.confirmPrompt = (message, promptToConfirm) => {
    console.log(`Verify: "${message}"`);
    inquirer.prompt([
        {
            name: "confirmPrompt",
            message: "Is the above correct?",
            type: 'confirm'
        }
    ]).then((answers) => {
        console.log("confirm prompt answer: ", answers["confirmPrompt"]);
        let answer = answers["confirmPrompt"];
        if(answers["confirmPrompt"] === true) {
            return;
        } else {
            promptToConfirm();
        }
    });
}

exports.image = () => inquirer.prompt([
    {
        name: "imageURL",
        message: "Please input the URL or path of your display image: "
    },
    {
        name: "imageAlt",
        message: "Please input alt text for your image: "
    }
]);

exports.deployedLink = () => inquirer.prompt([
    {
        name: "deployedLink",
        message: "Please input the URL of your deployed application: "
    }
])