import {
    Favorites
} from "./collection"
Meteor.methods({
    toggleFavorite(postId) {
        if (!Meteor.userId()) throw new Meteor.Error("You are not logged in.")
        const obj = {
            postId,
            userId: Meteor.userId()
        }
        const doc = Favorites.findOne(obj)
        if (!doc) return Favorites.insert(obj)
        return Favorites.remove(obj)
    }
})