import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./product.html"
import "../../components/review-form/review-form"
import {
    moment
} from "meteor/momentjs:moment"
import {
    Products
} from "../../../api/products/collection"
import {
    Reviews
} from "../../../api/reviews/collection"
import {
    Images
} from "../../../api/images/collection"
Template.product.onCreated(function () {
    const self = this
    self._id = new ReactiveVar(null)
    self.leaveReview = new ReactiveVar(false)
    self.imageId = new ReactiveVar(null)
    this.autorun(function () {
        FlowRouter.watchPathChange();
        const id = FlowRouter.getParam("id")
        self._id.set(id)
        Meteor.subscribe("all.products", {
            _id: id
        })
    })
})
Template.product.helpers({
    getProduct() {
        const instance = Template.instance()
        const product = Products.findOne({
            _id: instance._id.get()
        })
        if (!product) return
        instance.imageId.set(product.imageId)
        return product
    },
    getPhoto() {
        const instance = Template.instance()
        const imageId = instance.imageId.get()
        return Images.findOne({
            _id: imageId
        }).link()
    },
    isReviewFormActive() {
        return Template.instance().leaveReview.get()
    },
    isReviewOwner() {
        const {
            _id
        } = this
        const review = Reviews.findOne({
            _id
        })
        return review.userId === Meteor.userId()
    },
    getReviews() {
        const instance = Template.instance()
        return Reviews.find({
            postId: instance._id.get()
        })
    },
    findUserById(_id) {
        return Meteor.users.findOne({
            _id
        })
    },
    getTime(date) {
        return moment(date).fromNow()
    },
    getUser() {
        return Meteor.users.findOne({
            _id: this.userId
        })
    }
})
Template.product.events({
    "click #leave-review"() {
        const instance = Template.instance()
        instance.leaveReview.set(!instance.leaveReview.get())
    },
    "click .remove-review"() {
        swal({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,',
            cancelButtonText: 'No'
        }).then(({
            value
        }) => {
            if (value) {
                const {
                    _id
                } = this
                Meteor.call("removeReview", _id, (err, result) => {
                    if (err) return swal(err.error)
                    swal("Review deleted")
                })
            }
        })

    }
})