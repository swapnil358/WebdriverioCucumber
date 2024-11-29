import assert from "../base/Assert.js"
import browser from "../../base/Browser.js";
import adminPageObject from "../../../resources/selectors/web/adminPageObject.json" assert {type: 'json'}
import commonSelectors from '../../../resources/selectors/common/common.json' assert { type: 'json' };
import global from "../Global_include.js"




class LoginPage{

    async ddUser(userToAdd) {
       await browser.setValue(eval(adminPageObject.userManagement.txt_username), userToAdd);
        
    }
   
}

export default new LoginPage();