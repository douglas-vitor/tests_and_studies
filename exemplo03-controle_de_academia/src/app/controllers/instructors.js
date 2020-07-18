const instructor = require("../models/instructor")

module.exports = {
    index(req, res) {
        instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors })
        })
    },
    show(req, res) {
        return
    },
    create(req, res) {
        return res.render("instructors/create")

    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("please, fill all filds")
            }
        }

        instructor.create(req.body, function(instructor) {
            return res.redirect(`instructors/${instructor.id}`)
        })
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("please, fill all filds")
            }
        }

        let { avatar_url, birth, name, services, gender } = req.body

        return
    },
    delete(req, res) {
        return
    }
}