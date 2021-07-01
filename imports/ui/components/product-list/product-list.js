import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./product-list.html"
import "../list-nav/list-nav"
import {
    TAPi18n
} from "meteor/tap:i18n"
import {
    Products
} from "../../../api/products/collection"
import {
    Favorites
} from "../../../api/favorites/collection"
import {
    Reviews
} from "../../../api/reviews/collection"
import {
    Images
} from "../../../api/images/collection"
Template.productlist.onCreated(function () {

    const self = this
    self.query = new ReactiveVar({})

    self.sort = new ReactiveVar({})
    this.autorun(function () {
        FlowRouter.watchPathChange();
        const categoryId = FlowRouter.getQueryParam("category")
        let pageNum = FlowRouter.getQueryParam("pageNum")
        const question = FlowRouter.getQueryParam("q")
        const filter = FlowRouter.getQueryParam("filter")
        let myQuery = {}
        let mySort = {}
        let filterSort = {}
        const route = FlowRouter.getRouteName()
        if (route === "home") myQuery.isFeatured = true
        if (categoryId) myQuery.categoryId = categoryId
        if (route === "profile") myQuery.userId = FlowRouter.getParam("id")
        if (filter === "newest") filterSort.createdAt = -1;
        if (filter === "oldest") filterSort.createdAt = 1;
        if (filter === "highest") filterSort.price = -1;
        if (filter === "lowest") filterSort.price = 1;
        if (question) myQuery.name = new RegExp(question, 'i')
        if (!pageNum) pageNum = 1
        mySort.skip = ((pageNum - 1) * 10);
        mySort.limit = 10;

        mySort.sort = filterSort
        self.sort.set(mySort)
        self.query.set(myQuery)
        if (route === "favorites") {
            Meteor.subscribe("favorites", {}, mySort)
        } else {
            Meteor.subscribe("all.products", {
                ...myQuery
            }, mySort, question, pageNum)
        }
    })
})

Template.productlist.helpers({
    getProducts() {
        const query = Template.instance().query.get()
        let sort = Template.instance().sort.get()
        console.log(query, sort, "from product list")
        sort.skip = 0
        return Products.find(query, sort)
    },
    findImageById(_id) {
        return Images.findOne({
            _id
        }).link()
    },
    isCurrentUser() {
        const userId = this.userId
        return userId === Meteor.userId()
    },
    averageStars(_id) {
        let sumPoints = 0
        Reviews.find({
            postId: _id
        }).
        fetch().map((item) => {
            sumPoints += item.stars
        })
        const result = Math.floor(sumPoints / Reviews.find().count())
        return isNaN(result) ? 0 : result
    },
    findProductCount() {
        return Products.find().count()
    },
    isThereAnyProduct() {
        return Products.find().count() === 0

    },
    getPages() {
        let myPages = []
        for (let i = 1; i < 5 + 1; i++) {
            myPages.push(i)
        }
        return myPages
    },
    isInFav() {
        const {
            _id
        } = this
        const res = Favorites.findOne({
            postId: _id,
            userId: Meteor.userId()
        })

        return res != null
    }

})
Template.productlist.events({
    "click .add-fav"() {
        Meteor.call("toggleFavorite", this._id, (err, res) => {
            if (err) return swal(err.error)
        })
    },
    "click .page-item"() {
        const pageNum = this.toString()
        FlowRouter.setQueryParams({
            pageNum
        })
    },
    "click .delete"() {
        const {
            _id,
            userId
        } = this
        swal({
            title: TAPi18n.__("Are you sure?"),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: TAPi18n.__("Yes"),
            cancelButtonText: TAPi18n.__("No"),
        }).then(({
            value
        }) => {
            if (value) {
                Meteor.call("removeProduct", _id, userId, function (err, res) {
                    if (err) return swal(err.error)
                    swal( TAPi18n.__("Deleted"))
                })
            }
        })

    }
})