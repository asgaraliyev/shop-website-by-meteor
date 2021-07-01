import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./signup.html"
Template.signup.events({
    "submit form"(e) {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const username = e.target.username.value
        Accounts.createUser({
            email,
            password,
            username
        }, function (err, result) {
            if (err) return swal(err.message)
            FlowRouter.go("/home")
        })
    }
})