import allure from '@wdio/allure-reporter';
import fs from 'fs';

export function attachMetadataToAllure(world, scenarioName) {
    const featureFilePath = world.gherkinDocument.uri;
    const featureFileContent = fs.readFileSync(featureFilePath, 'utf-8').split('\n');

    let testIDs = [];
    let description = null;
    let author = null;
    let tag = null;
    let processingScenario = false;
    let tagProcessed = false;


    for (let i = 0; i < featureFileContent.length; i++) {
        const line = featureFileContent[i].trim();
        if (line.startsWith('Scenario:') && line.includes(scenarioName)) {
            break;
        }
        // Start processing the current scenario
        if (line.includes('Metadata')) {
            processingScenario = true;
            // Reset metadata for each new scenario
            testIDs = [];
            description = null;
            author = null;
            tag = null;
            tagProcessed = false; // Reset tag flag
        }

        // Collect metadata only if processing a scenario
        if (processingScenario) {
            if (line.includes('@TestID :')) {
                const getTestID = line.split(': ')[1].trim();
                if (getTestID.includes(',')) {
                    const splitIDs = getTestID.split(','); // Split by comma
                    splitIDs.forEach(id => testIDs.push(id.trim())); // Trim each and add to array
                } else {
                    testIDs.push(getTestID);
                }
            }

            if (line.includes('@Description :')) {
                description = line.split(': ')[1].trim();
            }

            if (line.includes('@AuthorName :')) {
                author = line.split(': ')[1].trim();
            }

            if (line.includes('@Tag :')) {
                tag = line.split(': ')[1].trim();
            }

            // Apply metadata when the scenario ends or at the end of the file
            if (line.includes('@TestID :')) {
                // Apply metadata
                if (testIDs.length > 0) {
                    const processedUrls = new Set();
                    testIDs.forEach(url => {
                        if (!processedUrls.has(url)) {
                            console.log("Processing URL:", url);
                            addTestIdToAllure(url);
                            processedUrls.add(url);
                        } else {
                            console.warn("URL already processed:", url);
                        }
                    });
                }

                if (description) {
                    addDescriptionToAllure(description);
                }

                if (author) {
                    addAuthorNameToAllure(author);
                }

                if (tag && !tagProcessed) { // Ensure tags are only added once
                    addTagToAllure(tag);
                    console.log("Tag processed: " + tag)
                    tagProcessed = true; // Mark tag as processed
                }

                // Reset metadata and stop processing for the current scenario
                processingScenario = false;
            }
        }
    }

    // Function definitions
    function addTestIdToAllure(testId) {
        allure.addLink(testId);
    }

    function addDescriptionToAllure(description) {
        allure.addDescription(description);
    }

    function addAuthorNameToAllure(author) {
        allure.addOwner(author);
    }

    function addTagToAllure(tag) {
        allure.addTag(tag);
    }
}
