import {
    Products
} from "./collection"
Meteor.methods({
    addProduct(data) {
        if(data.name==="")throw new Meteor.Error("Name can not be empty")
        // if (!Meteor.userId()) throw new Meteor.Error("You have to login first")
        Products.insert({
            ...data,
            createdAt: new Date(),
            userId: Meteor.userId()|| "dpCdbPrhDmzaEYsoW",
        })
    },
    editProduct(_id, data) {
        if (!Meteor.userId()) throw new Meteor.Error("You have to login first")
        if (Meteor.userId() !== data.userId) throw new Meteor.Error("It is not your product you can not edit it")
        Products.update({
            _id
        }, {
            $set: {
                ...data,
                userId: Meteor.userId()
            }
        })
    },
    removeProduct(_id, userId) {
        console.log(_id, userId, "removePRoduct")
        if (!Meteor.userId()) throw new Meteor.Error("You have to log in first")
        if (Meteor.userId() !== userId) throw new Meteor.Error("It is not your product.you can not dlete it")
        Products.remove({
            _id
        })
    }
})