const express = require("express")
const server = express()

// Pasta publica
server.use(express.static("public"))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
const db = require("./database/db")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurando rotas

// Index
server.get("/", (req, res) => {
// Resgatar registros do BD

    db.all(`SELECT * FROM trips WHERE id = 1`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        // Mostra a pagina html com os dados do BD
        return res.render("index.html", { trips : rows })
    })
})

// Gallery
server.get("/gallery", (req, res) => {
    //return res.render("gallery.html")
// Resgatar registros do BD

db.all(`SELECT * FROM trips WHERE id = 1`, function(err, rows) {
    if(err) {
        return console.log(err)
    }
    // Mostra a pagina html com os dados do BD
    return res.render("gallery.html", { trips : rows })
})
})

// Comments
server.get("/comments", (req, res) => {
    //return res.render("view-comments.html")
// Resgatar registros do BD tabela trips
/*db.all(`SELECT * FROM trips WHERE id = 1`, function(err, rows) {
    if(err) {
        return console.log(err)
    }
    // Mostra a pagina html com os dados do BD
    return res.render("view-comments.html", { trips : rows })
})*/

// Resgatar registros do BD tabela comments
db.all(`SELECT * FROM trips WHERE id = 1`, function(err, rows) {
    db.all(`SELECT * FROM comments WHERE tripcode = 1 ORDER BY id DESC`, function(err, comes) {
    if(err) {
        return console.log(err)
    }
    return res.render("view-comments.html", { trips : rows, comments : comes })
}) })

})




// Ligar servidor
server.listen(3000)