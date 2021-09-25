const express = require('express')
const app = express()
const port = 3000
const scrapers = require('./scrapers')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/players', async (req, res) => {
    const players = [
        {name: 'Erling Haaland', img: 'https://'},
        {name: 'Kylian Mbappe', img: 'https://'},
        {name: 'Lionel Messi', img: 'https://'},
    ]
    // get from db
    res.send(players)
})

app.post('/players', async (req,res) => {
    console.log(req.body);
    const playerData = await scrapers.scrapePlayer(req.body.playerURL)
    // scrape player
    // add to db
    res.send('success');
})

app.listen(port, () => {

})