import {
    Categories
} from "../../../api/categories/collection"
import {
    Images
} from "../../../api/images/collection"
import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./edit-product.html"
import {
    Products
} from "../../../api/products/collection"
//TODO:import categoreis html
Template.editproduct.onCreated(function () {
    const self = this
    self._id = new ReactiveVar(null)
    this.autorun(function () {
        FlowRouter.watchPathChange()
        const _id = FlowRouter.getParam("id")
        self._id.set(_id)
        Meteor.subscribe("all.products.current.user", {
            _id
        })
        Meteor.subscribe("all.categories")
    })
})

function clearForm(e) {
    e.target.name.value = ""
    e.target.description.value = ""
    e.target.image.value = ""
}

function editMyProduct(_id, data) {
    Meteor.call("editProduct", _id, data, function (err, res) {
        if (err) return swal(err.error)
        FlowRouter.go("/")
        swal("Edited")
    })
}
Template.editproduct.events({
    "submit form"(e) {
        e.preventDefault()
        let {
            _id,
            imageId,
            userId
        } = this
        const name = e.target.name.value
        const description = e.target.description.value
        const price = parseInt(e.target.price.value)
        const categoryId = e.target.category.value
        const isFeatured = e.target.isFeatured.checked
        const image = e.target.image.files[0]
        if (image) {
            const upload = Images.insert({
                file: image,
                chunkSize: "dynamic"
            }, false)
            upload.on("end", function (err, fileObj) {
                if (err) swal("Coudnt upload")
                imageId = fileObj._id
                editMyProduct(_id, {
                    name,
                    description,
                    categoryId,
                    isFeatured,
                    imageId,
                    price,
                    userId
                })
            })
            upload.start()
        } else {
            editMyProduct(_id, {
                name,
                description,
                categoryId,
                isFeatured,
                imageId,
                userId,
                price
            })
        }


        clearForm(e)
    }
})
Template.editproduct.helpers({
    getProduct() {
        return Products.findOne({
            _id: Template.instance()._id.get()
        })
    },
    getImage() {
        const {
            imageId
        } = this
        return Images.findOne({
            _id: imageId
        }).link()
    },
    getCategories() {
        return Categories.find()

    }
})