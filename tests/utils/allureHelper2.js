import allure from '@wdio/allure-reporter';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import constants from '../common/constants.js';

let jiraLink = "https://www.jira.com/project/"

class allureHelper2 {
    addAuthorName(world, scenarioName) {
        let authorNames = this.getPropertyValue(scenarioName, constants.AUTHORS_FILE_PATH);
        allure.addOwner(authorNames);
        //let autherList = this.splitAuthors(authorNames);
        //autherList.forEach(author => allure.addArgument("Author", author));
        
    }

    addJira(scenarioName) {
        let jiraIds = this.getPropertyValue(scenarioName, constants.JIRA_FILE_PATH);
        let jiraList = this.splitAuthors(jiraIds);
        jiraList.forEach(id => allure.addArgument("Jira", jiraLink + id));
    }



    addEnvironmentDetails() {
        // Here you can add different environment details dynamically
        //allure.addArgument('Browser', browser.capabilities.browserName);  // Example: Browser Name
        //allure.addArgument('Browser Version', browser.capabilities.browserVersion || browser.capabilities.version);  // Browser version
        // allure.addArgument('Platform', browser.capabilities.platformName || browser.capabilities.platform);  // Platform (OS)

        // You can add more custom environment variables as needed:
        //allure.addArgument('Test Environment', process.env.TEST_ENV || 'Staging');  // Example: Custom environment variable
        allure.addArgument('Application URL', process.env.TEST_URL || 'https://opensource-demo.orangehrmlive.com/');
    }

    
    getPropertyValue(scenarioName, filePath) {
        const metadataContent = fs.readFileSync(filePath, 'utf-8').split('\n');
    
        for (let line of metadataContent) {
            const [name, authors] = line.split(':');
            const scenario = name.trim();
        
            if (scenario === scenarioName) {
                return authors ? authors.trim() : null;
            }
        }
    }

    splitAuthors(authorList) {
        if (!authorList) {
            return [];
        }
    
        const authorsArray = authorList.split(',');
        let authorsArr = []
        for (let i = 0; i < authorsArray.length; i++) {
            authorsArr.push(authorsArray[i].trim());
        }
    
        return authorsArray;
    }
    

    moveFile(sourcePath, destinationPath) {
        // Ensure the destination directory exists
        const dir = path.dirname(destinationPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    
        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error(`Error moving file: ${err}`);
            } else {
                console.log(`File moved successfully from ${sourcePath} to ${destinationPath}`);
            }
        });
    }
}

export default new allureHelper2();

