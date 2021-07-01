import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./login.html"
Template.login.events({
    "submit form"(e) {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        Meteor.loginWithPassword(
            email,
            password,
            function (err, result) {
                if(err) return swal(err.message)
                FlowRouter.go("/home")
            })
    }
})