import "./admin.html"
import "../../components/categories/categories"
Template.admin.events({
    "submit form"(e) {
        e.preventDefault()
        const category = e.target.category.value
        Meteor.call("addCategory", category,function(err,res){
            if(err) return swal(err.message)
            swal("done")
        })
    }
})