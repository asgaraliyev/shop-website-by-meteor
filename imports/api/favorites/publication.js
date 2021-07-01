import {
    Favorites
} from "./collection"
import {
    Products
} from "../products/collection"
import {
    Images
} from "../images/collection"
import {
    Reviews
} from "../reviews/collection"
import {
    publishComposite
} from "meteor/reywood:publish-composite"
publishComposite("favorites", function (query = {}, sort = {}) {
    query.userId = Meteor.userId()
    return {
        find() {
            return Favorites.find(query, sort)
        },
        children: [{
            find(fav) {
                return Products.find({
                    _id: fav.postId
                })
            },
            children: [{
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
                }
            }]
        }]
    }
})