const fs = require('fs')
const data = require("./data.json")
const { age, date } = require("./utils")

// Show
exports.show = function(req, res) {
    const { id } = req.params
    const foundInstructors = data.instructors.find(function(instructor) {
        return instructor.id == id
    })
    if(!foundInstructors) {
        return res.send("Instructor not found.")
    }

    

    const instructor = {
        ...foundInstructors,
        age: age(foundInstructors.birth),
        services: foundInstructors.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundInstructors.created_at),
    }
    return res.render("instructors/show", { instructor: instructor })
}

// create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("please, fill all filds")
        }    
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("write file erros")
        }
        return res.redirect("/instructors")
    })
    //return res.send(req.body)
}

// Edit
exports.edit = function(req, res) {
    const { id } = req.params
    const foundInstructors = data.instructors.find(function(instructor) {
        return instructor.id == id
    })
    if(!foundInstructors) {
        return res.send("Instructor not found.")
    }

    const instructor = {
        ...foundInstructors,
        birth: date(foundInstructors.birth) 
    }
    

    return res.render("instructors/edit", { instructor: instructor})
}

// Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructors = data.instructors.find(function(instructor, foundIndex) {
        if(id == instructor.id) {
            index = foundIndex
            return true
        }
    })
    if(!foundInstructors) {
        return res.send("Instructor not found.")
    }

    const instructor = {
        ...foundInstructors,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write error!")
        }
        return res.redirect(`/instructors/${id}`)
    })
}

// Delete
exports.delete = function(req, res) {
    const { id } = req.body
    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write file error.")
        }
        return res.redirect("/instructors")
    })
}