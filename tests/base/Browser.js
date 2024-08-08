import { browser as wdioBrowser } from '@wdio/globals'

class Browser{

    async openURL(url) {
        await wdioBrowser.url(url);
    }

    
}

export default new Browser();

