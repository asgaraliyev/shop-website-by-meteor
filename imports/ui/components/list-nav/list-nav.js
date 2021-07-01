import {
    Products
} from "../../../api/products/collection"
import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./list-nav.html"
Template.listnav.events({
    "change #filter"(e) {
        const filter = e.target.value;
        FlowRouter.setQueryParams({
            filter
        })
    }
})
Template.listnav.helpers({
    findProductCount() {
        return Products.find().count()
    },
})