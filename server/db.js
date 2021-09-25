const typeorm = require("typeorm");

class Player {
    constructor(id, name, img, playerURL){
        this.id = id;
        this.name = name;
        this.img = img;
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

async function insertPlayer(name, img, playerURL){
    const connection = await getConnection();
    const player = new Player();
    player.name = name;
    player.img = img;
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