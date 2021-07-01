import {
    Images
} from "./collection"

import {
    publishComposite
} from "meteor/reywood:publish-composite"
publishComposite("all.images", function (query) {
    return {
        find() {
            return Images.find(query).cursor
        }
    }
})