import {
    Products
} from "../products/collection"
import {
    publishComposite
} from "meteor/reywood:publish-composite"
publishComposite("all.users", function (query = {}) {
    return {
        find() {
            return Meteor.users.find(query)
        },
        children: [{
            find(user) {
                return Products.find({
                    userId: user._id
                })
            }
        }]
    }
})