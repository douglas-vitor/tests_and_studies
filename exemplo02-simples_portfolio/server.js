const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/53841865?s=460&u=9abbda6f2aa5fe6a0fd2cbe7857bda8aaf1e3803&v=4",
        name: "Douglas Vitor",
        role: "Estudante Full Stack de JavaScript",
        description: 'No curso LaunchBase bootcamp da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/douglas-vitor" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/douglas-vitor-7576a3150" }
        ]
    }
    return res.render("sobre", { about: about })
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id
    const video = videos.find(function (video) {
        if (video.id == id) {
            return true
        }
    })
    if (!video) {
        return res.send("Video not found!")
    }
    return res.render("video", { item: video })
})




server.listen(5000, function () {
    console.log("Server is running")
})