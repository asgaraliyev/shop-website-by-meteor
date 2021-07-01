import {
    Products
} from "./collection"
import {
    Images
} from "../images/collection"
import {
    Reviews
} from "../reviews/collection"
import {
    Favorites
} from "../favorites/collection"
import {
    publishComposite
} from "meteor/reywood:publish-composite"


publishComposite("all.products", function (query = {}, sort, question) {
    console.log(query,"query")
    console.log(sort,"sort")
    return {
        find() {
            return Products.find(query, sort)
        },
        children: [{
            find(product) {
                return Meteor.users.find({
                    _id: product.userId
                })
            }
        }, {
            find(product) {
                return Images.find({
                    _id: product.imageId
                }).cursor
            }
        }, {
            find(product) {
                return Favorites.find({
                    postId: product._id,
                    userId: Meteor.userId()
                })
            }
        }, {
            find(product) {
                return Reviews.find({
                    postId: product._id
                })
            },
            children: [{
                find(review) {
                    return Meteor.users.find({
                        _id: review.userId
                    })
                }
            }]
        }]
    }
})
publishComposite("all.products.current.user", function (query = {}) {
    query = {
        ...query,
        userId: Meteor.userId()
    }
    
    return {
        find() {
            return Products.find(query)
        },
        children: [{
            find(product) {
                return Meteor.users.find({
                    _id: product.userId
                })
            }
        }, {
            find(product) {
                return Images.find({
                    _id: product.imageId
                }).cursor
            }
        }, {
            find(product) {
                return Reviews.find({
                    postId: product._id
                })
            },
            children: [{
                find(review) {
                    return Meteor.users.find({
                        _id: review.userId
                    })
                }
            }]
        }]
    }
})