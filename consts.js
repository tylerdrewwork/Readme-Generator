exports.imageName = "Image";
exports.deployedLinkName = "Deployed Link";
exports.lastUpdateDateName = "Last Updated Date";
exports.tableOfContentsName = "Table of Contents";
exports.installationName = "Installation Instructions";
exports.usageName = "Usage";
exports.currentFeaturesName = "Current Features";
exports.plannedFeaturesName = "Planned Features";
exports.licenseName = "license";
exports.contributingName = "Contributing";
exports.testsName = "Tests";
exports.questionsName = "Questions";

exports.tagify = (name) => {
    // let tag = name.map(char => {
    //     if (char == ' ') {
    //         return '-';
    //     }
    // })
    let tag = name;
    for (let i = 0; i < tag.length; i++) {
        if (tag[i] === ' ') {
            let newTag = tag.substr(0, i) + '-' + tag.substr(i + 1);
            tag = newTag;
            // tag[i] = '-';
        }
    }
    console.log(tag);
    return tag;
}