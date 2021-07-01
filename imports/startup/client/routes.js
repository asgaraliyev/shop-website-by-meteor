import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../ui/pages/home/home";
import "../../ui/pages/profile/profile";
import "../../ui/pages/favorites/favorites";
import "../../ui/pages/not-found/not-found.js";
import "../../ui/pages/add-product/add-product";
import "../../ui/pages/edit-product/edit-product.js";
import "../../ui/pages/product/product";
import "../../ui/pages/signup/signup";
import "../../ui/pages/admin/admin";
import "../../ui/pages/login/login";
import "../../ui/layouts/desktop";
FlowRouter.triggers.enter([isLoggedIn], {
  only: ["add-product", "edit-post", "admin"],
});

FlowRouter.route("/", {
  name: "index",
  action(query, queryParams) {
    FlowRouter.go("/home");
  },
});

FlowRouter.route("/home", {
  name: "home",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "home",
    });
  },
});
FlowRouter.route("/sign-up", {
  name: "signup",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "signup",
    });
  },
});
FlowRouter.route("/login", {
  name: "login",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "login",
    });
  },
});
FlowRouter.route("/profile/:id", {
  name: "profile",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "profile",
    });
  },
});
FlowRouter.route("/add-product", {
  name: "add-product",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "addproduct",
    });
  },
});
FlowRouter.route("/edit/:id", {
  name: "edit-product",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "editproduct",
    });
  },
});
FlowRouter.route("/product/:id", {
  name: "product",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "product",
    });
  },
});
FlowRouter.route("/admin", {
  name: "admin",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "admin",
    });
  },
});
FlowRouter.route("/favorites", {
  name: "favorites",
  action(params, queryParams) {
    BlazeLayout.render("desktopLayout", {
      content: "favorites",
    });
  },
});
FlowRouter.route("*", {
  action() {
    BlazeLayout.render("desktopLayout", {
      content: "notfound",
    });
  },
});

function isLoggedIn() {
  if (!Meteor.userId()) FlowRouter.go("/home");
}
