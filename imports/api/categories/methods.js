import {
    Categories
} from "./collection"
Meteor.methods({
    addCategory(name) {
        if (!name) throw new Meteor.Error("There is no name")
        Categories.insert({
            name
        })
    },
    removeCategory(_id) {
        if (!Metoer.userId()) throw new Meteor.Error("There is no user")
        Categories.remove({
            _id
        })

    }
})