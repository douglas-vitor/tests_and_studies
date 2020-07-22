const { age, date } = require("../../lib/utils")
const instructor = require("../models/instructor")

module.exports = {
    index(req, res) {
        const {filter} = req.query
        if(filter) {
            instructor.findBy(filter, function(instructors) {
                return res.render("instructors/index", {filter, instructors })
            })
        } else {
            instructor.all(function(instructors) {
                return res.render("instructors/index", { instructors })
            })
        }  
    },
    show(req, res) {
        instructor.find(req.params.id, function(instructor) {
            if(!instructor) {
                return res.send("Instructor not found")
            }

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", {instructor})
        })
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
        instructor.find(req.params.id, function(instructor) {
            if(!instructor) {
                return res.send("Instructor not found")
            }

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", {instructor})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("please, fill all filds")
            }
        }

        instructor.update(req.body, function() {
            return res.redirect(`instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    }
}