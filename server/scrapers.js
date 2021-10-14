const puppeteer = require('puppeteer');

async function scrapePlayer(url){
        
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[3]/div[8]/div/div/div[1]/div/div[1]/h1');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('/html/body/div[3]/div[8]/div/div/div[3]/div/img');
    ///html/body/div[3]/div[8]/div/div/div[4]/div/img <-- used in new arrival transfers
    const src = await el2.getProperty('src');
    const imageURL = await src.jsonValue();

    const [el3] = await page.$x('/html/body/div[3]/div[8]/div/div/div[5]/a/text()');
    const textPrice = await el3.getProperty('textContent');
    const price = await textPrice.jsonValue();

    const [el4] = await page.$x('/html/body/div[3]/div[8]/div/div/div[1]/div/div[1]/span');
    const num = await el4.getProperty('textContent');
    const shirtNum = await num.jsonValue();
    
    const [el5] = await page.$x('/html/body/div[3]/div[8]/div/div/div[4]/div[1]/a/img');
    const clImage = await el5.getProperty('src');
    const clubImage = await clImage.jsonValue();

    const [el6] = await page.$x('/html/body/div[3]/div[8]/div/div/div[4]/div[2]/span[1]/a');
    const clName = await el5.getProperty('textContent');
    const clubName = await clName.jsonValue();

    const [el7] = await page.$x('/html/body/div[3]/div[8]/div/div/div[2]/div/div[1]/p[3]/span[2]/img');
    const cntry = await el7.getProperty('src');
    const country = await cntry.jsonValue();

    browser.close();
    console.log({name, imageURL, price, shirtNum})
    return {name, imageURL, price, shirtNum}
}

module.exports = {
    scrapePlayer
}