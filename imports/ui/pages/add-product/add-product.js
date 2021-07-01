import {
    Categories
} from "../../../api/categories/collection"
import {
    Images
} from "../../../api/images/collection"
import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./add-product.html"
import "../../components/categories/categories"
Template.addproduct.onCreated(function () {
    this.autorun(function () {
        Meteor.subscribe("all.categories")
        Meteor.subscribe("all.images")
    })
})
Template.addproduct.helpers({
    getCategories() {
        return Categories.find()
    }
})

function clearForm(e) {
    e.target.name.value = ""
    e.target.description.value = ""
    e.target.image.value = ""
}
Template.addproduct.events({
    "submit form"(e) {
        e.preventDefault()
        try {
            const name = e.target.name.value
            const description = e.target.description.value
            const categoryId = e.target.category.value
            const price = parseInt(e.target.price.value)
            const isFeatured = e.target.isFeatured.checked
            const image = e.target.image.files[0]
            const upload = Images.insert({
                file: image,
                chunkSize: "dynamic"
            }, false)
            upload.on("end", function (err, fileObj) {
                if (err) swal("Coudnt upload")
                Meteor.call("addProduct", {
                    name,
                    description,
                    isFeatured,
                    categoryId,
                    price,
                    imageId: fileObj._id,
                }, function (err, res) {
                    if (err) return swal(err.error)
                    swal("You successfuly added post")
                    // FlowRouter.go("/home")
                })
            })
            upload.start()
        } catch (error) {
            swal(error.message)
        }
        // clearForm(e)


    }
})