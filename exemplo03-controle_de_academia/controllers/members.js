const fs = require('fs')
const data = require("../data.json")
const { date } = require("../utils")

// Index
exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
}

// Show
exports.show = function(req, res) {
    const { id } = req.params
    const foundMembers = data.members.find(function(member) {
        return member.id == id
    })
    if(!foundMembers) {
        return res.send("Member not found.")
    }

    const member = {
        ...foundMembers,
        birth: date(foundMembers.birth).birthDay
    }
    return res.render("members/show", { member: member })
}

// Create
exports.create = function(req, res) {
    return res.render("members/create")
}

// Post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("please, fill all filds")
        }    
    }

    
    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length -1]
    if (lastMember) {
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("write file erros")
        }
        return res.redirect("/members")
    })

}

// Edit
exports.edit = function(req, res) {
    const { id } = req.params
    const foundMembers = data.members.find(function(member) {
        return member.id == id
    })
    if(!foundMembers) {
        return res.send("Member not found.")
    }

    const member = {
        ...foundMembers,
        birth: date(foundMembers.birth).iso 
    }
    

    return res.render("members/edit", { member: member})
}

// Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMembers = data.members.find(function(member, foundIndex) {
        if(id == member.id) {
            index = foundIndex
            return true
        }
    })
    if(!foundMembers) {
        return res.send("Member not found.")
    }

    const member = {
        ...foundMembers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write error!")
        }
        return res.redirect(`/members/${id}`)
    })
}

// Delete
exports.delete = function(req, res) {
    const { id } = req.body
    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write file error.")
        }
        return res.redirect("/members")
    })
}