const puppeteer = require('puppeteer');

async function scrapePlayer(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const[el] = await page.$x('//*[@id="main"]/div[8]/div/div/div[1]/div/div[1]/h1');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const[el2] = await page.$x('//*[@id="fotoauswahlOeffnen"]/img');
    const src = await el2.getProperty('src');
    const imageURL = await src.jsonValue();

    browser.close();
    console.log({name, imageURL})
    return {name, imageURL}
}

module.exports = {
    scrapePlayer
}