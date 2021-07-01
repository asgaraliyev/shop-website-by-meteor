import "./rating.html"
Template.rating.helpers({
    stars() {
        const arr = [false, false, false, false, false]
        for (let i = 0; i <= parseInt(this.number) - 1; i++) {
            arr[i] = true
        }
        return arr
    },
    
})