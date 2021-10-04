const express = require('express');
const app = express();
const scrapers = require('./scrapers');
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/players', async (req, res) => {

    const players = await db.getAllPlayers();
    res.send(players);
})

app.post('/players', async (req,res) => {
    console.log(req.body);
    const playerData = await scrapers.scrapePlayer(req.body.playerURL);
    const players = await db.insertPlayer(playerData.name, playerData.imageURL, playerData.price, playerData.shirtNum, req.body.playerURL);
    res.send(players);
})

app.listen(process.env.PORT || 3000, () => {

})