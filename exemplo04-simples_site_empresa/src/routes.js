const express = require("express")
const routes = express.Router()
const publico = require("./app/controllers/public")

routes.get("/", publico.index)

module.exports = routes