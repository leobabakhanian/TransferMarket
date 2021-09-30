const typeorm = require("typeorm");

class Player {
    constructor(id, name, img, price, shirtNum){
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.shirtNum = shirtNum;
        //this.country = country;
        //this.clubImage = clubImage;
        //this.clubName = clubName;
        this.playerURL = playerURL;
    }
}

const EntitySchema = typeorm.EntitySchema;

const PlayerSchema = new EntitySchema({
    name: "Player",
    target: Player,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        img: {
            type: "text"
        },
        price: {
            type: "varchar"
        },
        shirtNum: {
            type: "varchar"
        },/*
        country: {
            type: "text"
        },
        clubImage: {
            type: "text"
        },
        clubName: {
            type: "varchar"
        },*/
        playerURL: {
            type: "text"
        }
    }
});

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "transfermarket",
        synchronize: true,
        logging: false,
        entities: [
            PlayerSchema
        ]
    })
}

async function getAllPlayers() {
    const connection = await getConnection();
    const playerRepo = connection.getRepository(Player);
    const players = await playerRepo.find();
    connection.close();
    return players;
}

async function insertPlayer(name, img, price, shirtNum, playerURL){
    const connection = await getConnection();
    const player = new Player();
    player.name = name;
    player.img = img;
    player.price = price;
    player.shirtNum = shirtNum;
    //player.country = country;
    //player.clubImage = clubImage;
    //player.clubName = clubName;
    player.playerURL = playerURL;

    const playerRepo = connection.getRepository(Player);
    const res = await playerRepo.save(player);
    console.log('saved', res);
    const allPlayers = await playerRepo.find();
    connection.close();
    return allPlayers;
}

module.exports = {
    getAllPlayers,
    insertPlayer
}