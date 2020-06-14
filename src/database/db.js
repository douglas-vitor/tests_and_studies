// Importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Cria objeto que ira fazer operações no BD
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// Utilizando BD
db.serialize( () => {
/*    db.run(`
    CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        place TEXT,
        title TEXT,
        description TEXT,
        capa TEXT
    );

`)

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        comment TEXT,
        tripcode INTEGER
    );

    CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        place TEXT,
        title TEXT,
        description TEXT,
        capa TEXT
    );
*/

// Inserir dados de exemplo
/*const query = `
    INSERT INTO trips (
        place,
        title,
        description,
        capa
    ) VALUES (?, ?, ?, ?);
`

const values = [
    "Paris",
    "Minha viagem para Paris!",
    "Esta foi a minha primeira viagem para a europa, onde finalmente descobri novos lugares e me aventurei para fora do país.",
    "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
]

function afterInsertData(err) {
    if(err) {
        return console.log(err)
    }
    console.log("Cadastro de Lugar com sucesso!")
    console.log(this)
}
*/

/*const query = `
    INSERT INTO comments (
        name,
        image,
        comment,
        tripcode
    ) VALUES (?, ?, ?, ?);
`

const values = [
    "Fred Gruguer",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png",
    "aiai estou testando cansado ja.",
    "1"
]

function afterInsertData(err) {
    if(err) {
        return console.log(err)
    }
    console.log("Cadastro de Comentario com sucesso!")
    console.log(this)
}

//db.run(query, values, afterInsertData)


// Consultar dados
db.all(`SELECT * FROM comments`, function(err, rows) {
    if(err) {
        return console.log(err)
    }
    console.log("Aqui estão seus registros: ")
    console.log(rows)
})
*/








})