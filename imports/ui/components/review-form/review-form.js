import "./review-form.html"
Template.reviewform.events({
    "submit form"(e) {
        e.preventDefault();
        const review = e.target.review.value;
        const stars = parseInt(e.target.stars.value);
        const postId = this.id

        Meteor.call("addReview", {
            review,
            stars,
            postId
        }, function (err, res) {
            if (err) return swal(err.error)
            swal("Done")
        });

    }
})