import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./profile.html"
import "../../components/product-list/product-list"
import {Products} from "../../../api/products/collection"
Template.profile.onCreated(function () {
    const self = this
    self.userId = new ReactiveVar(null)
    this.autorun(function () {
        FlowRouter.watchPathChange()
        const id = FlowRouter.getParam('id')
        self.userId.set(id)
    })
})
Template.profile.events({
    "click #log-out"() {
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
                Meteor.logout();
                FlowRouter.go("/login")
            }
        })

    }
})
Template.profile.helpers({
    isCurrentUser() {
        const userPageId = Template.instance().userId.get()
        return userPageId === Meteor.userId()
    },
    getUser() {
        return Meteor.users.findOne({
            _id: Template.instance().userId.get()
        })
    }
})