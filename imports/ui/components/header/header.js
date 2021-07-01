import {
    TAPi18n
} from "meteor/tap:i18n"
import {
    FlowRouter
} from "meteor/ostrio:flow-router-extra"
import "./header.html"
// import {Products} from "../../../api/products/"
Template.header.events({
    "submit #search-form"(e) {
        e.preventDefault();
        const data = e.target.data.value
        FlowRouter.go("/home")
        FlowRouter.setQueryParams({
            q: data
        })
    },
    "change #language"(e) {
        const val = e.target.value
        localStorage.setItem("lang", val)
        TAPi18n.setLanguage(localStorage.getItem("lang")).done(function (res) {
                console.log(res)
            })
            .fail(function (error_message) {

                console.log(error_message);
            });

    }
})