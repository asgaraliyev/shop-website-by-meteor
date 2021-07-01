import {
    Categories
} from "../../../api/categories/collection"
import "./categories.html"
Template.categories.onCreated(function () {
    this.autorun(function () {
        Meteor.subscribe("all.categories")
    })
})

Template.categories.helpers({
    getCategories() {
        return Categories.find()
    }
})