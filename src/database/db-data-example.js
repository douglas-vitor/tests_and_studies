// Importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Cria objeto que ira fazer operações no BD
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// Utilizando BD
// Criando as tabelas necessarias
db.serialize( () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        place TEXT,
        title TEXT,
        description TEXT,
        capa TEXT,
        user TEXT,
        codeuser TEXT
    );
`)

db.run(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        comment TEXT,
        tripcode INTEGER,
        user TEXT,
        codeuser TEXT
    );

`)

// Função de chamada de cadastro no BD
function afterInsertData(err) {
    if(err) {
        return console.log(err)
    }
    console.log("Cadastro de Comentario com sucesso!")
    console.log(this)
}

// Inserir dados de exemplo

var query = `
    INSERT INTO trips (
        place,
        title,
        description,
        capa,
        user,
        codeuser
    ) VALUES (?, ?, ?, ?, ?, ?);
`

var values = [
    "Paris",
    "Minha viagem para Paris!",
    "Esta foi a minha primeira viagem para a europa, onde finalmente descobri novos lugares e me aventurei para fora do país.",
    "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "teste",
    "1"
]

db.run(query, values, afterInsertData)

var query = `
    INSERT INTO trips (
        place,
        title,
        description,
        capa,
        user,
        codeuser
    ) VALUES (?, ?, ?, ?, ?, ?);
`

var values = [
    "Alemanha",
    "Como foi a viagem para a Alemanha.",
    "Esta foi a minha segunda viagem internacional, com ela aprendi e aperfeiçoei meus conhecimentos, melhorei meu idioma, e tive diversas novas experiencias de vida.",
    "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "teste",
    "1"
]

db.run(query, values, afterInsertData)

var query = `
    INSERT INTO comments (
        name,
        image,
        comment,
        tripcode,
        user,
        codeuser
    ) VALUES (?, ?, ?, ?, ?, ?);
`

var values = [
    "Freddy Kruege",
    "https://cdn.pixabay.com/photo/2018/09/15/08/56/freddy-krueger-3678932_960_720.png",
    "aiai estou testando cansado ja.",
    "1",
    "freduser",
    "100"
]

db.run(query, values, afterInsertData)

var query = `
    INSERT INTO comments (
        name,
        image,
        comment,
        tripcode,
        user,
        codeuser
    ) VALUES (?, ?, ?, ?, ?, ?);
`

var values = [
    "Carlos Adão",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/User_icon-cp.png",
    "Eu também estive aqui.",
    "1",
    "adaouser",
    "101"
]

db.run(query, values, afterInsertData)


// Consultar dados tabela trips
db.all(`SELECT * FROM trips`, function(err, rows) {
    if(err) {
        return console.log(err)
    }
    console.log("Aqui estão seus registros: ")
    console.log(rows)
})

// Consultar dados tabela comments
db.all(`SELECT * FROM comments`, function(err, rows) {
    if(err) {
        return console.log(err)
    }
    console.log("Aqui estão seus registros: ")
    console.log(rows)
})



})