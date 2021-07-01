import "./routes"
if (Meteor.isClient) {
    let lang = localStorage.getItem("lang")
    lang = lang || "az"
    TAPi18n.setLanguage(lang)
}