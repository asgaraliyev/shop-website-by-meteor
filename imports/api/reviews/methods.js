import {
    Reviews
} from "./collection"
Meteor.methods({
    addReview(data) {
        if (!data || data === {}) throw new Metoer.Error("Something happening bro")
        if (!Meteor.userId()) throw new Metoer.Error("You need to login first")
        const isThisUserReviewed = Reviews.find({
            userId: Meteor.userId(),
            postId: data.postId,

        }).count()
        console.log(isThisUserReviewed, "asdasd")
        if (isThisUserReviewed > 0) throw new Meteor.Error("You already reviewed this post")
        Reviews.insert({
            ...data,
            createdAt: new Date(),
            userId: Meteor.userId()
        })
    },
    removeReview(_id) {
        const review = Reviews.findOne({
            _id
        })
        if (review.userId !== Meteor.userId()) throw new Meteor.Error("it is not your review")
        Reviews.remove({
            _id
        })
    }
})