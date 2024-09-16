import allure from '@wdio/allure-reporter';
import fs from 'fs';

export function attachMetadataToAllure(world, scenarioName) {
    const featureFilePath = world.gherkinDocument.uri;
    const featureFileContent = fs.readFileSync(featureFilePath, 'utf-8').split('\n');

    let testID = null;
    let description = null;
    let author = null;

    for (let i = 0; i < featureFileContent.length; i++) {
        const line = featureFileContent[i].trim();

        if (line.startsWith('Scenario:') && line.includes(scenarioName)) {
            break;
        }

        if (line.includes('@TestID :')) {
            testID = line.split(': ')[1].trim();
        }

        if (line.includes('@Description :')) {
            description = line.split(': ')[1].trim();
        }

        if (line.includes('@AuthorName :')) {
            author = line.split(': ')[1].trim();
        }
    }

    if (testID) {
        addTestIdToAllure(testID);
    }

    if (description) {
        addDescriptionToAllure(description);
    }

    if (author) {
        addAuthorNameToAllure(author);
    }

    
    function addTestIdToAllure(testId) {
        allure.addLink(testId);
    }

    function addDescriptionToAllure(description) {
        allure.addDescription(description);
    }

    function addAuthorNameToAllure(author) {
        allure.addOwner(author);
    }
}
