const Publico = require("../models/Public")

module.exports = {
    index(req, res) {
        return res.render("home")
    }
}