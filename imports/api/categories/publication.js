import {
    Categories
} from "./collection"
import {
    publishComposite
} from "meteor/reywood:publish-composite"
publishComposite("all.categories", function (query = {}) {
    return {
        find() {
            return Categories.find(query)
        }
    }
})